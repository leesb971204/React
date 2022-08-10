import styled from "styled-components";

export const Container = styled.div`
  margin: 30px 8px 0 8px;
`;
export const H2 = styled.h2`
  display: inline;
`;
export const DroppableStyles = styled.div`
  background: ${(props) =>
    props.snapshot.isDraggingOver ? "lightblue" : "lightgrey"};
  padding: 4px;
  width: 250px;
  min-height: 500px;
`;
export const DraggableStyles = styled.div`
  background: ${(props) => (props.snapshot.isDragging ? "#263B4A" : "#456C86")};
  user-select: none;
  padding: 16px;
  margin: 0 0 8px 0;
  min-height: 50px;
  color: white;
`;
export const AddButton = styled.button`
  float: right;
`;
