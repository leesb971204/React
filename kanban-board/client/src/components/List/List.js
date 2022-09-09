import React, { useCallback, useContext, useEffect, useState } from "react";
import { Draggable, Droppable } from "react-beautiful-dnd";
import { v4 as uuidv4 } from "uuid";
import { SocketContext } from "../../context";
import useInput from "../../hooks/useInput";
import * as S from "./Style";

const List = ({ columns, setColumns }) => {
  const socket = useContext(SocketContext);
  const [editmode, setEditmode] = useState(false);
  const [editId, setEditId] = useState(null);
  const newTitle = useInput();
  const newText = useInput();

  /**
   * 아이템 생성 함수
   * @key 추가할 아이템이 속한 칼럼의 key
   */
  const addItem = useCallback(
    (key) => {
      const newItem = {
        id: uuidv4(),
        title: "New Item",
        text: "Text",
      };
      const copiedItems = [...columns[key].items, newItem];
      socket.emit("defaultEvent", key, copiedItems);
    },
    [columns, setColumns, socket]
  );

  /**
   * 아이템 삭제 함수
   * @key 삭제할 아이템이 속한 칼럼의 key
   * @index 삭제할 아이템의 인덱스
   */
  const deleteItem = useCallback(
    (key, index) => {
      //삭제하고자 하는 아이템이 속해있는 칼럼의 아이템 리스트
      const copiedItems = [...columns[key].items];
      copiedItems.splice(index, 1);
      socket.emit("defaultEvent", key, copiedItems);
    },
    [columns, setColumns, socket]
  );

  //아이템 수정 함수
  const editItem = useCallback(
    (key, index, item, newTitle, newText) => {
      const copiedItems = [...columns[key].items];
      copiedItems.splice(index, 1, {
        ...item,
        title: newTitle,
        text: newText,
      });
      socket.emit("defaultEvent", key, copiedItems);
      setEditmode(!editmode);
    },
    [columns, setColumns, socket, editmode]
  );
  //아이템 변화 발생시
  useEffect(() => {
    socket.on("toOntherColumn", (columnsList) => {
      setColumns({ ...columnsList });
    });
    socket.on("defaultEvent", (columnsList) => {
      console.log("hi");
      setColumns({ ...columnsList });
    });
  }, [columns, setColumns, socket]);

  return Object.entries(columns).map(([key, value]) => {
    return (
      <S.Container key={key}>
        <header>
          <S.H2>{value.name}</S.H2>
          <S.Button onClick={() => addItem(key)}>+</S.Button>
        </header>

        <Droppable droppableId={key}>
          {(provided, snapshot) => {
            return (
              <S.DroppableStyles
                snapshot={snapshot}
                {...provided.droppableProps}
                ref={provided.innerRef}
              >
                {value.items.map((item, index) => (
                  <Draggable key={item.id} draggableId={item.id} index={index}>
                    {(provided) => (
                      <S.DraggableStyles
                        {...provided.dragHandleProps}
                        {...provided.draggableProps}
                        ref={provided.innerRef}
                        snapshot={snapshot}
                      >
                        {editmode && item.id === editId ? (
                          <div>
                            <input {...newTitle} />
                            <input {...newText} />
                          </div>
                        ) : (
                          <>
                            <div>{item.title}</div>
                            <div>{item.text}</div>
                          </>
                        )}

                        <S.Button onClick={() => deleteItem(key, index)}>
                          X
                        </S.Button>
                        <S.Button
                          onClick={() =>
                            editmode
                              ? editItem(
                                  key,
                                  index,
                                  item,
                                  newTitle.value,
                                  newText.value
                                ) &
                                newTitle.onReset() &
                                newText.onReset()
                              : setEditmode(!editmode) & setEditId(item.id)
                          }
                        >
                          E
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
      </S.Container>
    );
  });
};

export default List;
