import React from "react";
import * as S from "./Style";

const User = ({ userList }) => {
  return (
    <S.Container>
      {userList.map((item) => (
        <S.Contents color={item}>{item}</S.Contents>
      ))}
    </S.Container>
  );
};

export default User;
