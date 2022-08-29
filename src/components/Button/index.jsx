import React from "react";
//TODO: Implement clsx -  from "classnames";
import styles from "./index.module.scss";

const Button = ({
  className,
  type,
  children,
  disabled = false,
  onClick,
  title,
  style,
  variant = "primary",
  ...other
}) => (
  <button
    {...other}
    style={style}
    title={title}
    disabled={disabled}
    type={type}
    onClick={onClick}
    className={classnames(className, styles.button, styles[variant])}
  >
    {children}
  </button>
);

export default Button;
