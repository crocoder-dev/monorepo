/* eslint-disable @next/next/no-img-element */
// TODO: Remove - import Document, { Html, Head, Main, NextScript } from "next/document";

export default class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
          <link
            href="https://fonts.googleapis.com/css2?family=Rubik&display=swap"
            rel="stylesheet"
          />
        </Head>
        <body>
          <Main />
          <NextScript />
          <script async defer src="https://sa.crocoder.dev/latest.js"></script>
          <noscript>
            <img src="https://sa.crocoder.dev/noscript.gif" alt="noscript" />
          </noscript>
        </body>
      </Html>
    );
  }
}
