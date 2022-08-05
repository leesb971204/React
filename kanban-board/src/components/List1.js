import React from "react";
import { Draggable, Droppable } from "react-beautiful-dnd";

const List1 = ({ list }) => {
  console.log(list);
  return (
    <Droppable droppableId="1">
      {(provided) => (
        <ul {...provided.droppableProps} ref={provided.innerRef}>
          {list.map((item, index) => (
            <Draggable key={item.id} draggableId={item.id} index={index}>
              {(provided) => (
                <li
                  {...provided.dragHandleProps}
                  {...provided.draggableProps}
                  ref={provided.innerRef}
                  onClick={() => console.log(provided)}
                >
                  {item.title}
                </li>
              )}
            </Draggable>
          ))}
          {provided.placeholder}
        </ul>
      )}
    </Droppable>
  );
};

export default List1;
