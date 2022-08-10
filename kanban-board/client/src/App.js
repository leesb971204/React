import React, { useCallback, useState } from "react";
import io from "socket.io-client";
import GlobalStyle from "./styles/GlobalStyle";
import { DragDropContext } from "react-beautiful-dnd";
import { v4 as uuidv4 } from "uuid";
import List from "./components/List";
import { useEffect } from "react";

const App = () => {
  const socket = io.connect("http://localhost:4000");
  const items = [];

  const columsList = {
    Todo: {
      name: "Todo",
      items: items,
    },
    InProgress: {
      name: "In Progress",
      items: [],
    },
    Done: {
      name: "Done",
      items: [],
    },
    Notes: {
      name: "Notes & Reference",
      items: [],
    },
  };
  const [columns, setColumns] = useState(columsList);

  //결과 재정렬 함수
  const reorder = useCallback((result, columns, setColumns) => {
    //범위 밖으로 떨구면 아무것도 안함
    if (!result.destination) return;

    // 다른 컬럼으로 이동시
    if (result.source.droppableId !== result.destination.droppableId) {
      //출발, 도착 컬럼 정보
      const sourceColumn = columns[result.source.droppableId];
      const destColumn = columns[result.destination.droppableId];

      //촐발, 도착 컬럼의 아이템
      const sourceItems = [...sourceColumn.items];
      const destItems = [...destColumn.items];

      //드래그한 item
      const [remove] = sourceItems.splice(result.source.index, 1);
      //도착 컬럼 아이템에 삽입
      destItems.splice(result.destination.index, 0, remove);

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

    // 같은 컬럼에서 순서만 바꿀 때
    else {
      const column = columns[result.source.droppableId];
      const copiedItems = [...column.items];

      const [remove] = copiedItems.splice(result.source.index, 1);
      copiedItems.splice(result.destination.index, 0, remove);
      setColumns({
        ...columns,
        [result.source.droppableId]: {
          ...column,
          items: copiedItems,
        },
      });
    }
  }, []);

  //아이템 생성 함수
  const addItem = useCallback(
    (key) => {
      const newItem = {
        id: uuidv4(),
        title: "New Item",
        text: "Text",
      };
      const copiedItems = [...columns[key].items, newItem];
      const name = columns[key].name;
      socket.emit("message", key, name, copiedItems);
      setColumns({
        ...columns,
        [key]: {
          ...columns,
          name: name,
          items: copiedItems,
        },
      });
    },
    [socket, columns]
  );

  //아이템 삭제 함수
  const deleteItem = useCallback(
    (key, name, index) => {
      //삭제하고자 하는 아이템이 속해있는 칼럼의 아이템 리스트
      const copiedItems = [...columns[key].items];
      copiedItems.splice(index, 1);
      socket.emit("message", key, name, copiedItems);
      setColumns({
        ...columns,
        [key]: {
          name: name,
          items: copiedItems,
        },
      });
    },
    [socket, columns]
  );

  useEffect(() => {
    socket.on("message", (key, name, copiedItems) => {
      setColumns({
        ...columns,
        [key]: {
          name: name,
          items: copiedItems,
        },
      });
    });
  }, [columns, socket]);

  return (
    <>
      <GlobalStyle />
      <div
        style={{ display: "flex", justifyContent: "center", height: "100%" }}
      >
        <DragDropContext
          onDragEnd={(result) => reorder(result, columns, setColumns)}
        >
          <List
            columns={columns}
            addItem={addItem}
            deleteItem={deleteItem}
          ></List>
        </DragDropContext>
      </div>
    </>
  );
};

export default App;
