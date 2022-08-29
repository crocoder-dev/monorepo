import React from "react";
//TODO: Implement clsx - import classnames from "classnames";
import * as styles from "./index.module.scss";

/**
 * Basic Field component of the CroCoder component library.
 * Used to unify styling of input controls.
 */
const Field = ({
  className,
  error,
  errorMessage,
  id,
  label,
  required,
  style,
  children,
  empty,
  labelId,
  labelHtmlFor,
  removeChildrenStyle = false,
  removeBottomBorder = false,
  hideLabel = false,
  hideLabelOnFocus,
}) => {
  return (
    <div
      id={id}
      style={style}
      className={classnames(className, styles.wrapper, {
        [styles.error]: error,
        [styles.empty]: empty,
        [styles.hideLabel]: hideLabel,
      })}
    >
      <label
        id={labelId}
        aria-hidden={hideLabel}
        htmlFor={labelHtmlFor}
        className={classnames(styles.label, {
          [styles.labelHidden]: hideLabelOnFocus,
        })}
      >
        {label} {required && "*"}
      </label>
      <div
        className={classnames(styles.field, {
          [styles.includeBorder]: !removeBottomBorder,
          [styles.style__child]: !removeChildrenStyle,
        })}
      >
        {children}
      </div>
      {errorMessage && error && (
        <span title={errorMessage} className={styles.message}>
          {errorMessage}
        </span>
      )}
    </div>
  );
};

export default Field;
