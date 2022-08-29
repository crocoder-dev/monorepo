import React from "react";
import styles from "./index.module.scss";

const Column = ({ children, margin, text }) => {
  let style = {};
  if (margin) {
    style.margin = `${margin}px`;
  }

  let className = styles.column;

  if (text) {
    className = `${className} ${styles.text}`;
  }

  return (
    <div className={className} style={style}>
      {children}
    </div>
  );
};

export default Column;
