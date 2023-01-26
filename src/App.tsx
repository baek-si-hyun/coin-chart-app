import Router from "./Router";
import styled, { createGlobalStyle, ThemeProvider } from "styled-components";
import { useState } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { isLightAtom } from "./atom";
import { darkTheme, lightTheme } from "./theme";

const GlobalStyle = createGlobalStyle`
@import url('https://fonts.googleapis.com/css2?family=Source+Sans+Pro:wght@300;400&display=swap');
html, body, div, span, applet, object, iframe,
h1, h2, h3, h4, h5, h6, p, blockquote, pre,
a, abbr, acronym, address, big, cite, code,
del, dfn, em, img, ins, kbd, q, s, samp,
small, strike, strong, sub, sup, tt, var,
b, u, i, center,
dl, dt, dd, ol, ul, li,
fieldset, form, label, legend,
table, caption, tbody, tfoot, thead, tr, th, td,
article, aside, canvas, details, embed, 
figure, figcaption, footer, header, hgroup, 
menu, nav, output, ruby, section, summary,
time, mark, audio, video {
  margin: 0;
  padding: 0;
  border: 0;
  font-size: 100%;
  font: inherit;
  vertical-align: baseline;
}
/* HTML5 display-role reset for older browsers */
article, aside, details, figcaption, figure, 
footer, header, hgroup, menu, nav, section {
  display: block;
}
body {
  line-height: 1;
}
ol, ul {
  list-style: none;
}
blockquote, q {
  quotes: none;
}
blockquote:before, blockquote:after,
q:before, q:after {
  content: '';
  content: none;
}
table {
  border-collapse: collapse;
  border-spacing: 0;
}
body {
  background-color: ${(props) => props.theme.bgColor};
  color: ${(props) => props.theme.textColor};
  transition: background-color 0.2s ease-in-out 0s;
}
a {
  text-decoration: none;
  color:inherit;
}
* {
  box-sizing: border-box;
}
`;

const Svg = styled.svg`
  fill: ${(props) => props.theme.textColor};
`;

const ToggleMode = styled.button`
  background-color: ${(props) => props.theme.cardBgColor};
  border: none;
  box-shadow: 0 0 0.5rem ${(props) => props.theme.shadowColor};
  width: 4rem;
  height: 4rem;
  position: fixed;
  right: 1rem;
  bottom: 1rem;
  border-radius: 15px;
  cursor: pointer;
`;
function App() {
  const isLight = useRecoilValue(isLightAtom);
  const setterFn = useSetRecoilState(isLightAtom);
  const toggleModeHandler = () => setterFn((current) => !current);
  return (
    <>
      <ThemeProvider theme={isLight ? lightTheme : darkTheme}>
        <ToggleMode onClick={toggleModeHandler}>
          <div>
            {isLight ? (
              <Svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 50 50"
                width="50px"
                height="50px"
              >
                <path d="M 24.90625 3.96875 C 24.863281 3.976563 24.820313 3.988281 24.78125 4 C 24.316406 4.105469 23.988281 4.523438 24 5 L 24 11 C 23.996094 11.359375 24.183594 11.695313 24.496094 11.878906 C 24.808594 12.058594 25.191406 12.058594 25.503906 11.878906 C 25.816406 11.695313 26.003906 11.359375 26 11 L 26 5 C 26.011719 4.710938 25.894531 4.433594 25.6875 4.238281 C 25.476563 4.039063 25.191406 3.941406 24.90625 3.96875 Z M 10.65625 9.84375 C 10.28125 9.910156 9.980469 10.183594 9.875 10.546875 C 9.769531 10.914063 9.878906 11.304688 10.15625 11.5625 L 14.40625 15.8125 C 14.648438 16.109375 15.035156 16.246094 15.410156 16.160156 C 15.78125 16.074219 16.074219 15.78125 16.160156 15.410156 C 16.246094 15.035156 16.109375 14.648438 15.8125 14.40625 L 11.5625 10.15625 C 11.355469 9.933594 11.054688 9.820313 10.75 9.84375 C 10.71875 9.84375 10.6875 9.84375 10.65625 9.84375 Z M 39.03125 9.84375 C 38.804688 9.875 38.59375 9.988281 38.4375 10.15625 L 34.1875 14.40625 C 33.890625 14.648438 33.753906 15.035156 33.839844 15.410156 C 33.925781 15.78125 34.21875 16.074219 34.589844 16.160156 C 34.964844 16.246094 35.351563 16.109375 35.59375 15.8125 L 39.84375 11.5625 C 40.15625 11.265625 40.246094 10.800781 40.0625 10.410156 C 39.875 10.015625 39.460938 9.789063 39.03125 9.84375 Z M 25 15 C 19.484375 15 15 19.484375 15 25 C 15 30.515625 19.484375 35 25 35 C 30.515625 35 35 30.515625 35 25 C 35 19.484375 30.515625 15 25 15 Z M 4.71875 24 C 4.167969 24.078125 3.78125 24.589844 3.859375 25.140625 C 3.9375 25.691406 4.449219 26.078125 5 26 L 11 26 C 11.359375 26.003906 11.695313 25.816406 11.878906 25.503906 C 12.058594 25.191406 12.058594 24.808594 11.878906 24.496094 C 11.695313 24.183594 11.359375 23.996094 11 24 L 5 24 C 4.96875 24 4.9375 24 4.90625 24 C 4.875 24 4.84375 24 4.8125 24 C 4.78125 24 4.75 24 4.71875 24 Z M 38.71875 24 C 38.167969 24.078125 37.78125 24.589844 37.859375 25.140625 C 37.9375 25.691406 38.449219 26.078125 39 26 L 45 26 C 45.359375 26.003906 45.695313 25.816406 45.878906 25.503906 C 46.058594 25.191406 46.058594 24.808594 45.878906 24.496094 C 45.695313 24.183594 45.359375 23.996094 45 24 L 39 24 C 38.96875 24 38.9375 24 38.90625 24 C 38.875 24 38.84375 24 38.8125 24 C 38.78125 24 38.75 24 38.71875 24 Z M 15 33.875 C 14.773438 33.90625 14.5625 34.019531 14.40625 34.1875 L 10.15625 38.4375 C 9.859375 38.679688 9.722656 39.066406 9.808594 39.441406 C 9.894531 39.8125 10.1875 40.105469 10.558594 40.191406 C 10.933594 40.277344 11.320313 40.140625 11.5625 39.84375 L 15.8125 35.59375 C 16.109375 35.308594 16.199219 34.867188 16.039063 34.488281 C 15.882813 34.109375 15.503906 33.867188 15.09375 33.875 C 15.0625 33.875 15.03125 33.875 15 33.875 Z M 34.6875 33.875 C 34.3125 33.941406 34.011719 34.214844 33.90625 34.578125 C 33.800781 34.945313 33.910156 35.335938 34.1875 35.59375 L 38.4375 39.84375 C 38.679688 40.140625 39.066406 40.277344 39.441406 40.191406 C 39.8125 40.105469 40.105469 39.8125 40.191406 39.441406 C 40.277344 39.066406 40.140625 38.679688 39.84375 38.4375 L 35.59375 34.1875 C 35.40625 33.988281 35.148438 33.878906 34.875 33.875 C 34.84375 33.875 34.8125 33.875 34.78125 33.875 C 34.75 33.875 34.71875 33.875 34.6875 33.875 Z M 24.90625 37.96875 C 24.863281 37.976563 24.820313 37.988281 24.78125 38 C 24.316406 38.105469 23.988281 38.523438 24 39 L 24 45 C 23.996094 45.359375 24.183594 45.695313 24.496094 45.878906 C 24.808594 46.058594 25.191406 46.058594 25.503906 45.878906 C 25.816406 45.695313 26.003906 45.359375 26 45 L 26 39 C 26.011719 38.710938 25.894531 38.433594 25.6875 38.238281 C 25.476563 38.039063 25.191406 37.941406 24.90625 37.96875 Z" />
              </Svg>
            ) : (
              <Svg
                xmlns="http://www.w3.org/2000/svg"
                width="50px"
                height="50px"
                viewBox="-15 -15 150 150"
              >
                <g>
                  <path d="M49.06,1.27c2.17-0.45,4.34-0.77,6.48-0.98c2.2-0.21,4.38-0.31,6.53-0.29c1.21,0.01,2.18,1,2.17,2.21 c-0.01,0.93-0.6,1.72-1.42,2.03c-9.15,3.6-16.47,10.31-20.96,18.62c-4.42,8.17-6.1,17.88-4.09,27.68l0.01,0.07 c2.29,11.06,8.83,20.15,17.58,25.91c8.74,5.76,19.67,8.18,30.73,5.92l0.07-0.01c7.96-1.65,14.89-5.49,20.3-10.78 c5.6-5.47,9.56-12.48,11.33-20.16c0.27-1.18,1.45-1.91,2.62-1.64c0.89,0.21,1.53,0.93,1.67,1.78c2.64,16.2-1.35,32.07-10.06,44.71 c-8.67,12.58-22.03,21.97-38.18,25.29c-16.62,3.42-33.05-0.22-46.18-8.86C14.52,104.1,4.69,90.45,1.27,73.83 C-2.07,57.6,1.32,41.55,9.53,28.58C17.78,15.57,30.88,5.64,46.91,1.75c0.31-0.08,0.67-0.16,1.06-0.25l0.01,0l0,0L49.06,1.27 L49.06,1.27z" />
                </g>
              </Svg>
            )}
          </div>
        </ToggleMode>
        <GlobalStyle />
        <Router />
      </ThemeProvider>
    </>
  );
}

export default App;
