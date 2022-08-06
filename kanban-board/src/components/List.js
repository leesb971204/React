import React from "react";
import { Draggable, Droppable } from "react-beautiful-dnd";

const List = ({ columns, deleteItem }) => {
  return Object.entries(columns).map(([key, value]) => {
    return (
      <div key={key} style={{ margin: "8px" }}>
        <h2>{value.name}</h2>
        <div>
          <Droppable droppableId={key}>
            {(provided, snapshot) => {
              return (
                <div
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                  style={{
                    background: snapshot.isDraggingOver
                      ? "lightblue"
                      : "lightgrey",
                    padding: 4,
                    width: 250,
                    minHeight: 500,
                  }}
                >
                  {value.items.map((item, index) => (
                    <Draggable
                      key={item.id}
                      draggableId={item.id}
                      index={index}
                    >
                      {(provided) => (
                        <div
                          {...provided.dragHandleProps}
                          {...provided.draggableProps}
                          ref={provided.innerRef}
                          // style={{ wordBreak: "break-all" }}
                        >
                          {item.title}
                          <button
                            onClick={() => deleteItem(key, value.name, index)}
                          >
                            X
                          </button>
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              );
            }}
          </Droppable>
        </div>
      </div>
    );
  });
};

export default List;
