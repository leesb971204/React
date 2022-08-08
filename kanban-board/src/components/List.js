import React from "react";
import { Draggable, Droppable } from "react-beautiful-dnd";
import styled from "styled-components";

const DroppableStyles = styled.div`
  background: ${(props) =>
    props.snapshot.isDraggingOver ? "lightblue" : "lightgrey"};
  padding: 4px;
  width: 250px;
  min-height: 500px;
`;
const DraggableStyles = styled.div`
  background: ${(props) => (props.snapshot.isDragging ? "#263B4A" : "#456C86")};
  user-select: none;
  padding: 16px;
  margin: 0 0 8px 0;
  min-height: 50px;
  color: white;
`;
const AddItemButton = styled.button`
  float: right;
`;

const List = ({ columns, addItem, deleteItem }) => {
  return Object.entries(columns).map(([key, value]) => {
    return (
      <div key={key} style={{ margin: "8px" }}>
        <h2>
          {value.name}
          <AddItemButton onClick={() => addItem(key)}>+</AddItemButton>
        </h2>

        <div>
          <Droppable droppableId={key}>
            {(provided, snapshot) => {
              return (
                <DroppableStyles
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
                        <DraggableStyles
                          {...provided.dragHandleProps}
                          {...provided.draggableProps}
                          ref={provided.innerRef}
                          snapshot={snapshot}
                        >
                          <div>{item.title}</div>
                          {item.text}
                          <button
                            onClick={() => deleteItem(key, value.name, index)}
                            style={{ float: "right" }}
                          >
                            X
                          </button>
                        </DraggableStyles>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </DroppableStyles>
              );
            }}
          </Droppable>
        </div>
      </div>
    );
  });
};

export default List;
