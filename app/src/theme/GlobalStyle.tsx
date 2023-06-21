import React from "react";
import reset from "emotion-reset";
import { COLORS, darkTheme, lightTheme } from "@seoko/theme";
import { Global, css, useTheme } from "@emotion/react";

import { makeCssVariables } from "@/utils/css/makeCssVariables";

const GlobalStyle = () => {
  const theme = useTheme();

  return (
    <Global
      styles={css`
        ${reset}

        * {
          box-sizing: border-box;
        }

        html {
          -webkit-text-size-adjust: none;
          -moz-text-size-adjust: none;
          -o-text-size-adjust: none;
        }
        html,
        body,
        #__next {
          height: 100%;
        }

        body {
          ${makeCssVariables(COLORS)}

          margin: 0;
          font-size: 16px;
          background-color: ${theme.background1};
        }

        body[data-theme="light"] {
          ${makeCssVariables(lightTheme)}
        }

        body[data-theme="dark"] {
          ${makeCssVariables(darkTheme)}
        }

        a {
          color: inherit;
          text-decoration: none;
          outline: none;
        }

        input,
        textarea,
        button {
          appearance: none;
          -moz-appearance: none;
          -webkit-appearance: none;
          border-radius: 0;
          -webkit-border-radius: 0;
          -moz-border-radius: 0;
        }

        input:focus-visible {
          outline: 0;
        }

        @media (prefers-color-scheme: light) {
          body {
            ${makeCssVariables(lightTheme)}
          }
        }

        @media (prefers-color-scheme: dark) {
          body {
            ${makeCssVariables(darkTheme)}
          }
        }
      `}
    />
  );
};

export default GlobalStyle;
