import React, { useCallback } from "react";
import { Draggable, Droppable } from "react-beautiful-dnd";
import { v4 as uuidv4 } from "uuid";
import * as S from "./Style";

const List = ({ socket, columns, setColumns }) => {
  //아이템 생성 함수
  const addItem = useCallback(
    (key) => {
      console.log("add");
      const newItem = {
        id: uuidv4(),
        title: "New Item",
        text: "Text",
      };
      const copiedItems = [...columns[key].items, newItem];
      socket.emit("defaultEvent", key, copiedItems);
      setColumns({
        ...columns,
        [key]: {
          ...columns[key],
          items: copiedItems,
        },
      });
    },
    [columns, setColumns, socket]
  );

  //아이템 삭제 함수
  const deleteItem = useCallback(
    (key, index) => {
      console.log("del");
      //삭제하고자 하는 아이템이 속해있는 칼럼의 아이템 리스트
      const copiedItems = [...columns[key].items];
      copiedItems.splice(index, 1);
      socket.emit("defaultEvent", key, copiedItems);
      setColumns({
        ...columns,
        [key]: {
          ...columns[key],
          items: copiedItems,
        },
      });
    },
    [columns, setColumns, socket]
  );
  return Object.entries(columns).map(([key, value]) => {
    return (
      <S.Container key={key}>
        <header>
          <S.H2>{value.name}</S.H2>
          <S.Button onClick={() => addItem(key)}>+</S.Button>
        </header>
        <main>
          <Droppable droppableId={key}>
            {(provided, snapshot) => {
              return (
                <S.DroppableStyles
                  snapshot={snapshot}
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                >
                  {value.items.map((item, index) => (
                    <Draggable
                      key={item.id}
                      draggableId={item.id}
                      index={index}
                    >
                      {(provided) => (
                        <S.DraggableStyles
                          {...provided.dragHandleProps}
                          {...provided.draggableProps}
                          ref={provided.innerRef}
                          snapshot={snapshot}
                        >
                          <div>{item.title}</div>
                          {item.text}
                          <S.Button onClick={() => deleteItem(key, index)}>
                            X
                          </S.Button>
                        </S.DraggableStyles>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </S.DroppableStyles>
              );
            }}
          </Droppable>
        </main>
      </S.Container>
    );
  });
};

export default List;
