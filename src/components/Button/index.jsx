import React from 'react';
import clsx from 'clsx';
import styles from './index.module.scss';

const Button = ({
  className,
  type,
  children,
  disabled = false,
  onClick,
  title,
  style,
  variant = 'primary',
  ...other
}) => (
  <button
    {...other}
    style={style}
    title={title}
    disabled={disabled}
    type={type}
    onClick={onClick}
    className={clsx(className, styles.button, styles[variant])}
  >
    {children}
  </button>
);

export default Button;
