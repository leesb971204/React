import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
html,
body,
#root {
  height: 100%;
  font-family: Open-Sans, Helvetica, Sans-Serif;
}
body {
  margin: 0;
  background-color: #f5f5f5;
}
`;

export default GlobalStyle;
