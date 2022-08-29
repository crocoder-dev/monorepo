import React from "react";
import styles from "./index.module.scss";
import CodeIcon from "../../../../images/icons/code.svg";
import Css3Icon from "../../../../images/icons/css3.svg";
import JavascriptIcon from "../../../../images/icons/javascript.svg";
import Html5Icon from "../../../../images/icons/html5.svg";
import SassIcon from "../../../../images/icons/sass.svg";
import ReactIcon from "../../../../images/icons/react.svg";

function getIcon(type) {
  switch (type) {
    case "javascript":
      return <JavascriptIcon className={`icon ${styles.icon}`} />;
    case "react":
      return <ReactIcon className={`icon ${styles.icon}`} />;
    case "html":
    case "html5":
      return <Html5Icon className={`icon ${styles.icon}`} />;
    case "scss":
    case "sass":
      return <SassIcon className={`icon ${styles.icon}`} />;
    case "css":
      return <Css3Icon className={`icon ${styles.icon}`} />;
    case "code":
    default:
      return <CodeIcon className={`icon ${styles.icon}`} />;
    case "none":
      return null;
  }
}

const Snippet = ({ children, type }) => (
  <div className={styles.snippet}>
    {getIcon(type)}
    <div className={styles.content}>{children}</div>
  </div>
);

export default Snippet;
