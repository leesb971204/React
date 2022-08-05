import React, { useCallback, useState } from "react";
import { DragDropContext } from "react-beautiful-dnd";
import List1 from "./components/List1";
import List2 from "./components/List2";

const App = () => {
  const items = [
    { id: "0", title: "첫번째" },
    { id: "1", title: "두번째" },
    { id: "2", title: "세번째" },
    { id: "3", title: "네번째" },
    { id: "4", title: "다섯번째" },
  ];

  const columsList = {
    1: {
      name: "1",
      items: items,
    },
    2: {
      name: "2",
      items: [],
    },
  };
  const [columns, setColumns] = useState(columsList);

  //결과 재정렬 함수
  const reorder = useCallback((result, columns, setColumns) => {
    console.log(result);
    if (!result.destination) return;
    if (result.source.droppableId !== result.destination.droppableId) {
      const sourceColumn = columns[result.source.droppabledId];
      const destColumn = columns[result.source.droppableId];
      const sourceItems = [...sourceColumn.items];
      const destItems = [...destColumn.items];

      const [remove] = sourceItems.splice(result.source.index, 1);
      destItems.splice(result.source.destination.index, 0, remove);

      setColumns({
        ...columns,
        [result.source.droppableId]: {
          ...sourceColumn,
          items: sourceItems,
        },
        [result.destination.droppableId]: {
          ...destColumn,
          items: destItems,
        },
      });
    }
  }, []);
  console.log(columsList);
  return (
    <div>
      <DragDropContext
        onDragEnd={(result) => reorder(result, columns, setColumns)}
      >
        <List1 list={columsList[1].items}></List1>
        <List2 list={columsList[2].items}></List2>
      </DragDropContext>
    </div>
  );
};

export default App;
