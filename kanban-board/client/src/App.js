import React, { useCallback, useState, useEffect, useRef } from "react";
import io from "socket.io-client";
import GlobalStyle from "./styles/GlobalStyle";
import { DragDropContext } from "react-beautiful-dnd";
import List from "./components/List/List";
import User from "./components/User/User";
import * as S from "./Style";

export const socket = io("http://localhost:4000");

const App = () => {
  const [userList, setUserList] = useState([]);
  //고유 아이디(rgb값 랜덤으로 생성)
  const num = useRef([
    Math.floor(Math.random() * 255),
    Math.floor(Math.random() * 255),
    Math.floor(Math.random() * 255),
  ]);
  const items = [
    { id: "1", title: "Test1", text: "Test1" },
    { id: "2", title: "Test2", text: "Test2" },
  ];

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
      socket.emit(
        "toOntherColumn",
        result.source.droppableId,
        sourceItems,
        result.destination.droppableId,
        destItems
      );
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
      socket.emit("defaultEvent", result.source.droppableId, copiedItems);
      setColumns({
        ...columns,
        [result.source.droppableId]: {
          ...column,
          items: copiedItems,
        },
      });
    }
  }, []);

  //최초 접속시
  useEffect(() => {
    socket.emit("join", num.current);
    socket.on("join", (data) => {
      setUserList(
        Array.from(data).filter(
          (x) => JSON.stringify(x) !== JSON.stringify(num.current)
        )
      );
    });
  }, []);
  //접속 종료시
  useEffect(() => {
    socket.on("left", (data) => {
      setUserList(
        Array.from(data).filter(
          (x) => JSON.stringify(x) !== JSON.stringify(num.current)
        )
      );
    });
  });
  //아이템 변화 발생시
  useEffect(() => {
    socket.on(
      "toOntherColumn",
      (sourceId, sourceItem, destinationId, destinationItems) => {
        setColumns({
          ...columns,
          [sourceId]: {
            ...columns[sourceId],
            items: sourceItem,
          },
          [destinationId]: {
            ...columns[destinationId],
            items: destinationItems,
          },
        });
      }
    );
    socket.on("defaultEvent", (key, copiedItems) => {
      setColumns({
        ...columns,
        [key]: {
          ...columns[key],
          items: copiedItems,
        },
      });
    });
  }, [columns]);

  return (
    <>
      <GlobalStyle />
      <User userList={userList}></User>
      <S.Container>
        <DragDropContext
          onDragEnd={(result) => reorder(result, columns, setColumns)}
        >
          <List
            socket={socket}
            columns={columns}
            setColumns={setColumns}
          ></List>
        </DragDropContext>
      </S.Container>
    </>
  );
};

export default App;
