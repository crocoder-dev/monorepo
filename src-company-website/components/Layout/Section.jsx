import React from "react";
import * as styles from "./index.module.scss";

const Section = ({ children, as = "section", className, blog, ...other }) => {
  return React.createElement(
    as,
    {
      className: `${className} ${styles.section}${blog ? ` ${styles.blog}` : ''}`,
      ...other,
    },
    children
  );
};

export default Section;
