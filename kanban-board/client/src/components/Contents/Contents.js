import React, { useCallback, useContext, useEffect, useState } from "react";
import { DragDropContext } from "react-beautiful-dnd";
import { SocketContext } from "../../context";
import List from "../List/List";
import * as S from "./Style";

const Contents = () => {
  const socket = useContext(SocketContext);
  const [columns, setColumns] = useState({});

  useEffect(() => {
    socket.on("show", (columnsList) => {
      setColumns(columnsList);
    });
  }, []);
  /** 아이템 재정렬 함수*/
  const reorder = useCallback(
    (result, columns) => {
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
      }

      // 같은 컬럼에서 순서만 바꿀 때
      else {
        const column = columns[result.source.droppableId];
        const copiedItems = [...column.items];

        const [remove] = copiedItems.splice(result.source.index, 1);
        copiedItems.splice(result.destination.index, 0, remove);
        socket.emit("defaultEvent", result.source.droppableId, copiedItems);
      }
    },
    [socket]
  );
  return (
    <S.Container>
      <DragDropContext
        onDragEnd={(result) => reorder(result, columns, setColumns)}
      >
        <List columns={columns} setColumns={setColumns}></List>
      </DragDropContext>
    </S.Container>
  );
};

export default Contents;
