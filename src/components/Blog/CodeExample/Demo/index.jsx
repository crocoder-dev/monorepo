import React from "react";
import styles from "./index.module.scss";
import DemoIcon from "../../../../images/icons/demo.svg";

const Demo = ({ children, hide }) => {
  return (
    <div className={styles.demo}>
      {!!hide || (
        <div className={styles.icon}>
          <img src={DemoIcon} alt="demo icon" />
        </div>
      )}
      <div className={styles.content}>{children}</div>
    </div>
  );
};

export default Demo;
