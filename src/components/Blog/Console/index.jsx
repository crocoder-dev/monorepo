import React from 'react';
import styles from './index.module.scss';

const Console = ({ consoleOutputs }) => {
  const consoleText = consoleOutputs.map((t, i) => (
    // eslint-disable-next-line react/no-array-index-key
    <div key={i}>
      <div>{t}</div>
    </div>
  ));

  return (
    <div className={styles.terminal}>
      <div>{consoleText}</div>
    </div>
  );
};

export default Console;
