import clsx from "clsx";
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

  return React.createElement(
    Component,
    {
      ...other,
      title,
      className: clsx(
        styles.typography,
        className,
        styles[`size${fontSize}`],
        styles[textAlign],
        styles[`weight${fontWeight}`],
        styles[`${fontFamily}`],
        color && styles[`color${color}`]
      ),
    },
    children
  );
};

export default Typography;
