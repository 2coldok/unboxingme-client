import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  // html
  :root {
    --background-color: #1c2128;
    --light-blue: #90CBFB;
    --middle-blue: #4588e1;
    --light-gray: #9198a1;
    --light-white: #c5d1de;
    --dark-gray: #4f4f4f;
    --light-white: #d1d7e0;
  }

  @font-face {
    font-family: 'DungGeunMo';
    src: url('https://fastly.jsdelivr.net/gh/projectnoonnu/noonfonts_six@1.2/DungGeunMo.woff') format('woff');
    font-weight: normal;
    font-style: normal;
    font-display: swap;
  }

  // 본고딕 적용
  @import url('//fonts.googleapis.com/earlyaccess/notosanskr.css');

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

    /* background-color: #212121; */
    background-color: var(--background-color);
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

  input {
    background-color: var(--background-color);
    outline: none;
    border-radius: 0.4rem;
    border: 1.5px solid var(--light-gray);
    color: #ECECEC;
    padding: 0.5rem 0.7rem 0.5rem 0.7rem;
  }

  input:focus {
    border-color: var(--middle-blue);
  }

  textarea {
    background-color: var(--background-color);
    outline: none;
    border-radius: 0.4rem;
    border: 1.5px solid var(--light-gray);
    color: #ECECEC;
    padding: 0.5rem 0.7rem 0.5rem 0.7rem;
    line-height: 1.4;
    word-spacing: -0.3rem;
    resize: none;
  }

  textarea:focus {
    border-color: var(--middle-blue);
  }
`;

export default GlobalStyle;
