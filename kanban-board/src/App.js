import React, { useState } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";

const App = () => {
  const [lists, setLists] = useState([
    { id: "0", title: "첫번째" },
    { id: "1", title: "두번째" },
    { id: "2", title: "세번째" },
    { id: "3", title: "네번째" },
    { id: "4", title: "다섯번째" },
  ]);

  //결과 재정렬 함수
  const reorder = (result) => {
    console.log(result);
    if (!result.destination) return;
    const items = Array.from(lists); //lists가 이미 배열인데 Array.from을 쓸 필요가 있나
    const [removed] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, removed);
    setLists(items);
  };

  return (
    <div>
      <DragDropContext onDragEnd={reorder}>
        <Droppable droppableId="lists">
          {(provided) => (
            <ul {...provided.droppableProps} ref={provided.innerRef}>
              {lists.map((item, index) => (
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
      </DragDropContext>
    </div>
  );
};

export default App;
