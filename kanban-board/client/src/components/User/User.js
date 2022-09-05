import React, { useContext, useEffect, useRef, useState } from "react";
import { SocketContext } from "../../context";
import { userId } from "../../utils/UserId";
import * as S from "./Style";

const User = () => {
  const socket = useContext(SocketContext);
  const [userList, setUserList] = useState([]);
  //고유 아이디(rgb값 랜덤으로 생성)
  const num = useRef(userId);
  /** 접속중인 유저 리스트 변경 */
  const editUserList = (data) => {
    setUserList(
      Array.from(data).filter(
        (x) => JSON.stringify(x) !== JSON.stringify(num.current)
      )
    );
  };

  //접속 혹은 종료한 유저 발생시 자신을 제외한 접속한 유저 렌더링
  useEffect(() => {
    socket.emit("join", num.current);
    socket.on("join", (data) => {
      editUserList(data);
    });
    socket.on("left", (data) => {
      editUserList(data);
    });
  }, [socket]);

  return (
    <S.Container>
      {userList.map((item, index) => (
        <S.Contents key={index} color={item}>
          {item}
        </S.Contents>
      ))}
    </S.Container>
  );
};

export default User;
