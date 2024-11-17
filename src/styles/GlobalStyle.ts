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

    --dark-black100: #12181f;
    --light-white500: #a6b6e3;

    --white200: #cdcdcd; 

    --blue100: #7eaaff; 
    /* --blue100: #3772ff; */
    --blue200: #3b90f9;
    /* --blue300: #4588e1; */
    
    --gray100: #6a737d;
    --gray200: #3a3d42;
    --gray300: #202124;
    --gray400: #181b1d; 

    --black100: #101114;

    --red500: #e65757;

    /**Custom */
    --blue500: #3772ff;
    --white100: #FFFFFF;
    --black900: #080708;
    --gray500: #5c5c5c;
    --gray900: #333333;

    /**기존 brand color #7eaaff */

    /**확정**/
    --background: #30343f;
    --background-search: #262626;
    --background-riddle: #252932;
    --background-block: #343945;
    --brand: #77aaff;
    --brand-light: #8ab4f8;
    --border: #43484e;
    --font-main: #fafaff;
    --font-info: #adb5bd;
    --font-yellow: #ffd54f;
    --font-red: #fb6376;
    --font-pink: #f67eff;
    --font-subtitle: #dcdcdc;
    --font-chore: #6a737d;
    --font-explain: #999fa5;


    
    --sub-title: #6a737d;
    
    --font-warning: #ff4d4d;

    --button-border: #485f88;
    --button-background: #324055;
    --button-font: #8ab4f8;
  }
  
  // 둥군모꼴
  /* @font-face {
    font-family: 'DungGeunMo';
    src: url('https://fastly.jsdelivr.net/gh/projectnoonnu/noonfonts_six@1.2/DungGeunMo.woff') format('woff');
    font-weight: normal;
    font-style: normal;
    font-display: swap;
  } */

  @font-face {
    font-family: 'S-CoreDream';
    src: url('https://fastly.jsdelivr.net/gh/projectnoonnu/noonfonts_six@1.2/S-CoreDream-5Medium.woff') format('woff');
    font-weight: 500;
    font-style: normal;
  }

  @font-face {
    font-family: 'S-CoreDream';
    src: url('https://fastly.jsdelivr.net/gh/projectnoonnu/noonfonts_six@1.2/S-CoreDream-4Regular.woff') format('woff');
    font-weight: 400;
    font-style: normal;
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

    background-color: var(--background);
    color: var(--font-main);
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
    border: 1px solid var(--button-border);
    background-color: var(--button-background);
    color: var(--button-font);
    padding: 0.4em 1.5em;
    border-radius: 0.5rem;
    font-size: 1em;
    font-family: inherit;
    font-weight: 700;
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
    outline: none;
    border-radius: 0.4rem;
    font-size: 1rem;
    border: 1px solid var(--font-chore);
    background-color: var(--background);
    color: var(--font-main);
    padding: 0.5rem 0.7rem 0.5rem 0.7rem;
    font-family: 'Roboto', sans-serif;
    :focus {
      border-color: var(--brand);
    }
  }

  textarea {
    background-color: var(--background);
    color: var(--font);
    outline: none;
    border-radius: 0.4rem;
    border: 1px solid var(--font-chore);
    padding: 0.5rem 0.7rem 0.5rem 0.7rem;
    font-size: 1rem;
    resize: none;
    font-family: 'Roboto', sans-serif;
    :focus {
      border-color: var(--brand);
    }
  }

  pre {
    /* font-family: 'DungGeunMo', sans-serif; */
    font-family: 'Roboto', sans-serif;
    white-space: pre-wrap;
    overflow-x: auto;
    font-size: 1em;
    border-radius: 0.4rem;
    padding: 0.5rem 0.7rem 0.5rem 0.7rem;
  }
`;

export default GlobalStyle;
