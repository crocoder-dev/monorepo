import React from "react";
import * as styles from "./index.module.scss";
import clsx from "clsx";

const Section = ({ children, as = "section", className, blog, ...other }) => {
  return React.createElement(
    as,
    {
      className: clsx(className, styles.section, blog && styles.blog),
      ...other,
    },
    children
  );
};

export default Section;
