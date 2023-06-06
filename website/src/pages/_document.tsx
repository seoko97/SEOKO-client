import React from "react";
import Document, { Html, Main, NextScript, Head } from "next/document";

interface Props {
  styleTag: Array<React.ReactElement<null>>;
}

function setBodyDatasetByTheme() {
  const prefersDarkFromMq = window.matchMedia("(prefers-color-scheme: dark)").matches;

  const persistedPreference = localStorage.getItem("theme");

  const colorMode = persistedPreference || (prefersDarkFromMq ? "dark" : "light");

  localStorage.setItem("theme", colorMode);

  document.body.dataset.theme = colorMode;
}

const ThemeScript = () => {
  const stringifyFn = String(setBodyDatasetByTheme);

  const fnToRunOnClient = `(${stringifyFn})()`;

  return <script dangerouslySetInnerHTML={{ __html: fnToRunOnClient }} />;
};

class MyDocument extends Document<Props> {
  render() {
    return (
      <Html lang="ko">
        <Head />
        <body>
          <Main />
          <div id="modal" />
          <NextScript />
          <ThemeScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
