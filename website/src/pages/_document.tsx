import React from "react";
import Document, { DocumentContext, Html, Main, NextScript, Head } from "next/document";
import { extractCritical } from "@emotion/server";

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

const ScriptTag = () => {
  const stringifyFn = String(setBodyDatasetByTheme);

  const fnToRunOnClient = `(${stringifyFn})()`;

  return <script dangerouslySetInnerHTML={{ __html: fnToRunOnClient }} />;
};

class MyDocument extends Document<Props> {
  static async getInitialProps(context: DocumentContext) {
    const initialProps = await Document.getInitialProps(context);
    const styles = extractCritical(initialProps.html);

    return {
      ...initialProps,
      styles: (
        <>
          {initialProps.styles}
          <style
            data-emotion-css={styles.ids.join("")}
            dangerouslySetInnerHTML={{ __html: styles.css }}
          />
        </>
      ),
    };
  }

  render() {
    return (
      <Html lang="ko">
        <Head />
        <body>
          <ScriptTag />
          <Main />
          <NextScript />
          <div id="modal" />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
