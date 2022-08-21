import React, { useEffect, useRef, useState } from "react";
import * as S from "./Style";

const User = ({ socket }) => {
  const [userList, setUserList] = useState([]);
  //고유 아이디(rgb값 랜덤으로 생성)
  const num = useRef([
    Math.floor(Math.random() * 255),
    Math.floor(Math.random() * 255),
    Math.floor(Math.random() * 255),
  ]);
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
  }, [socket]);
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
  return (
    <S.Container>
      {userList.map((item) => (
        <S.Contents color={item}>{item}</S.Contents>
      ))}
    </S.Container>
  );
};

export default User;
