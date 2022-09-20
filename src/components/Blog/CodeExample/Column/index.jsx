import React from "react";
import styles from "./index.module.scss";
import clsx from "clsx";

const Column = ({ children, margin, text }) => {
  let style = {};
  if (margin) {
    style.margin = `${margin}px`;
  }

  return (
    <div className={clsx(styles.column, text && styles.text)} style={style}>
      {children}
    </div>
  );
};

export default Column;
