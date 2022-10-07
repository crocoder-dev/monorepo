import React from 'react';
import clsx from 'clsx';
import * as styles from './index.module.scss';

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
}) => (
  <div
    id={id}
    style={style}
    className={clsx(className, styles.wrapper, {
      [styles.error]: error,
      [styles.empty]: empty,
      [styles.hideLabel]: hideLabel,
    })}
  >
    <label
      id={labelId}
      aria-hidden={hideLabel}
      htmlFor={labelHtmlFor}
      className={clsx(styles.label, {
        [styles.labelHidden]: hideLabelOnFocus,
      })}
    >
      {label}
      {' '}
      {required && '*'}
    </label>
    <div
      className={clsx(styles.field, {
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

export default Field;
