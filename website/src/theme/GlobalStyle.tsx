import React from "react";
import reset from "emotion-reset";
import { Global, css } from "@emotion/react";

import { makeCssVariables } from "@/utils/css/makeCssVariables";

import { darkTheme, lightTheme } from ".";

const GlobalStyle = () => {
  return (
    <Global
      styles={css`
        ${reset}

        html {
          -webkit-text-size-adjust: none;
          -moz-text-size-adjust: none;
          -o-text-size-adjust: none;
        }

        body,
        #__next {
          height: 100%;
        }

        body[data-theme="light"] {
          ${makeCssVariables(lightTheme)}
        }

        body[data-theme="dark"] {
          ${makeCssVariables(darkTheme)}
        }

        body {
          height: 100%;
          margin: 0;
          font-size: 16px;
          line-height: 1.5715;
          user-select: none;
          background-color: var(--background1);
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

        ::-webkit-scrollbar {
          width: 5px;
          height: 10px;
          background-color: inherit;
        }

        ::-webkit-scrollbar-thumb {
          background-color: var(--color-primary);
          border-radius: 5px;
        }

        * {
          box-sizing: border-box;
        }
      `}
    />
  );
};

export default GlobalStyle;
