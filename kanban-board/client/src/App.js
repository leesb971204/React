import React from "react";
import GlobalStyle from "./styles/GlobalStyle";
import Contents from "./components/Contents/Contents";
import User from "./components/User/User";
import { SocketContext, socket } from "./context/index";
import * as S from "./Style";

const App = () => {
  return (
    <>
      <GlobalStyle />
      <SocketContext.Provider value={socket}>
        <User />
        <S.Container>
          <Contents />
        </S.Container>
      </SocketContext.Provider>
    </>
  );
};

export default App;
