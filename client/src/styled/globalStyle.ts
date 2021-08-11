import { createGlobalStyle } from "styled-components";
import { breakpoints } from "../util/mediaQueries";

const GlobalStyle = createGlobalStyle`

:root {
  --global-padding: 20px;
  --background-fade-time: 500ms;

  ${breakpoints.mobileL} {
    --global-padding: 30px;
  }

  ${breakpoints.laptop} {
    --grid-gutter-width: 24px;
    --global-padding: 60px;
  }

  ${breakpoints.laptopL} {
    --global-padding: 100px;
  }
}

* {
  font-family: 'IBM Plex Sans', Helvetica Neue,Arial,Helvetica,Geneva,sans-serif;
  box-sizing: border-box;
}

html, body {
  margin: 0;
}

body {
  overscroll-behavior-y: none;
  background-color: ${({ theme }) => theme.color.background};
  font-weight: 300;
  transition: background var(--background-fade-time);
  -webkit-font-smoothing: antialiased;
}

h1, h2, h3, h4, h5, p, label, li {
  color: ${({ theme }) => theme.color.text};
  transition: color var(--background-fade-time);
}

h1 {
  display: inline-block;
  font-size: 1.875em;
  margin-block-start: ${({ theme }) => theme.spacing.m};
  margin-block-end: ${({ theme }) => theme.spacing.m};
  line-height: 1.3;
  font-weight: 700;
  ${breakpoints.laptop} {
    font-size: 3.75em;
  }
}

h2 {
  display: inline-block;
  font-size: 1.25em;
  margin-block-start: ${({ theme }) => theme.spacing.s};
  margin-block-end: ${({ theme }) => theme.spacing.s};
  line-height: 1.3;
  font-weight: 700;
  ${breakpoints.laptop} {
    font-size: 2em;
  }
}
h3 {
  display: inline-block;
  font-size: 1.15em;
  margin-block-start: ${({ theme }) => theme.spacing.s};
  margin-block-end: ${({ theme }) => theme.spacing.s};
  line-height: 1.3;
  font-weight: 500;
  ${breakpoints.laptop} {
    font-size: 1.75em;
  }
}
h4 {
  display: inline-block;
  font-size: 1em;
  margin-block-start: ${({ theme }) => theme.spacing.s};
  margin-block-end: ${({ theme }) => theme.spacing.s};
  line-height: 1.3;
  font-weight: 500;
  ${breakpoints.laptop} {
    font-size: 1.5em;
  }
}
h5 {
  display: inline-block;
  font-size: 1em;
  margin-block-start: ${({ theme }) => theme.spacing.xs};
  margin-block-end: ${({ theme }) => theme.spacing.xs};
  line-height: 1.3;
  font-weight: 500;
  ${breakpoints.laptop} {
    font-size: 1em;
  }
}
p {
  display: inline-block;
  font-size: 12px;
  line-height: 1.25em;
  margin: 0;
  font-weight: 300;
  ${breakpoints.laptop} { 
    font-size: 1em;
  }
}
label {
  display: inline-block;
  font-size: 12px;
  line-height: 1em;
  margin: 0;
  font-weight: 300;
  ${breakpoints.laptop} {
    font-size: 0.75em;
  }
}
ul {
  list-style-type: none;
  margin: 0;
  padding: 0;
}
li {
  font-weight: 300;
  font-size: 12px;
  text-size-adjust: none;
  ${breakpoints.laptop} {
    font-size: 1em;
  }
}

button {
  cursor: pointer;
  background: none;
  border: none;
  padding: 2px;
  display: flex;
  align-items: center;
  justify-content: center;
}

::-webkit-scrollbar {
  background: transparent;
  overflow: visible;
  width: 6px;
}
::-webkit-scrollbar-thumb {
  background-color: #cacaca;
  border-radius: 12px;
}
::-webkit-scrollbar-thumb:hover {
  background: rgba(0, 0, 0, 0.8);
}
::-webkit-scrollbar-track-piece {
  background-color: transparent;
}
::-webkit-scrollbar-corner {
  background: transparent;
}

div,
button,
textarea,
input,
select,
a {
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  -webkit-tap-highlight-color: transparent;
}
`;

export default GlobalStyle;
