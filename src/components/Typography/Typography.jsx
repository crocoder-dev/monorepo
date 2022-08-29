import React from "react";
import styles from "./Typography.module.scss";

/**
 * Simple element for creating textual elements with the
 * CroCoder styling.
 */
const Typography = ({
  className,
  element,
  children,
  title,
  fontSize,
  fontWeight,
  color,
  fontFamily,
  textAlign,
  ...other
}) => {
  let Component;
  if (
    [
      "h1",
      "h2",
      "h3",
      "h4",
      "h5",
      "h6",
      "div",
      "span",
      "p",
      "label",
      "blockquote",
      "time",
    ].includes(element)
  ) {
    Component = element;
  } else {
    Component = "span";
  }

  let compositeClassName = `${styles.typography} ${className} `;
  compositeClassName += ` ${styles[`size${fontSize}`]} ${styles[textAlign]} ${
    styles[`weight${fontWeight}`]
  } ${styles[`${fontFamily}`]}`;
  if (color) {
    compositeClassName += ` ${styles[`color${color}`]}`;
  }
  return React.createElement(
    Component,
    {
      ...other,
      title,
      className: compositeClassName,
    },
    children
  );
};

export default Typography;
