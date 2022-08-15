import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  position: absolute;
  right: 10px;
  top: 0;
`;

export const Contents = styled.p`
  width: 50px;
  height: 50px;
  float: right;
  border-radius: 50%;
  margin-right: 5px;
  color: transparent;
  ${(props) => {
    return `background-color: rgb(${props.color[0]},${props.color[1]},${props.color[2]})`;
  }};
`;
