import React, { useState } from "react";
import GlobalStyle from "./styles/GlobalStyle";
import DnD from "./components/DragDropContext/DnD";
import User from "./components/User/User";
import { SocketContext, socket } from "./context/index";
import * as S from "./Style";

const App = () => {
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

  return (
    <>
      <GlobalStyle />
      <SocketContext.Provider value={socket}>
        <User />
        <S.Container>
          <DnD columns={columns} setColumns={setColumns} />
        </S.Container>
      </SocketContext.Provider>
    </>
  );
};

export default App;
