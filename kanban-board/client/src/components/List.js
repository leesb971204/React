import React from "react";
import { Draggable, Droppable } from "react-beautiful-dnd";
import * as S from "./Style";

const List = ({ columns, addItem, deleteItem }) => {
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
