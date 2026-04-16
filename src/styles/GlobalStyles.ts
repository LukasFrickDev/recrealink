import { createGlobalStyle } from "styled-components";

export const GlobalStyles = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Manrope:wght@600;700;800&family=Sora:wght@600;700&display=swap');

  *, *::before, *::after {
    box-sizing: border-box;
  }

  html, body, #root {
    margin: 0;
    min-height: 100%;
    width: 100%;
    padding: 0;
  }

  body {
    font-family: ${({ theme }) => theme.fonts.body};
    background: ${({ theme }) => theme.colors.background};
    color: ${({ theme }) => theme.colors.text};
    line-height: 1.4;
    text-rendering: optimizeLegibility;
    -webkit-font-smoothing: antialiased;
  }

  h1, h2, h3, h4, h5, h6 {
    margin: 0;
    font-family: ${({ theme }) => theme.fonts.title};
    color: ${({ theme }) => theme.colors.text};
  }

  p {
    margin: 0;
  }

  a {
    color: inherit;
    text-decoration: none;
  }

  button, input, select, textarea {
    font-family: inherit;
  }
`;
