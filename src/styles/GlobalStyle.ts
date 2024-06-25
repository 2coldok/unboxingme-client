import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  // html
  :root {
    
  }

  body {
    width: 100%;
    height: 100%;
    margin: 0;
    padding: 0;

    font-family: 'Roboto', sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    font-synthesis: none;
    text-rendering: optimizeLegibility;

    background-color: #212121;
    color: #ECECEC;
  }

  // App StyledContainer
  #root {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
  }

  *, *::before, *::after {
    box-sizing: border-box;
  }

  button {
    border-style: none;
    border-radius: 8px;
    padding: 0.6em 1.2em;
    font-size: 1em;
    font-weight: 500;
    font-family: inherit;
    cursor: pointer;
  }

  ul, li {
    list-style: none;
    padding: 0;
  }

  a {
    font-weight: 500;
    color: #646cff;
    text-decoration: inherit;
  }
`;

export default GlobalStyle;
