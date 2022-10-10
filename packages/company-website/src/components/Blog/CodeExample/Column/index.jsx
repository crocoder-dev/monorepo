import React from 'react';
import clsx from 'clsx';
import styles from './index.module.scss';

const Column = ({ children, margin, text }) => {
  const style = {};
  if (margin) {
    style.margin = `${margin}px`;
  }

  return (
    <div className={clsx(styles.column, text && styles.text)} style={style}>
      {children}
    </div>
  );
};

export default Column;
