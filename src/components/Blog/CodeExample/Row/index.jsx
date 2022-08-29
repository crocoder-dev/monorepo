import React from "react";
import styles from "./index.module.scss";

const Row = ({ children, margin }) => {
  let style = {};
  if (margin) {
    style.margin = `-${margin}px`;
  }
  return (
    <div className={styles.row} style={style}>
      {children}
    </div>
  );
};

export default Row;
