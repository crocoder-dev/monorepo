import React from 'react';
import Typography from '../../../Typography';
import styles from './index.module.scss';

const ListToggle = ({ children, title }) => (
  <div className={styles['list-toggle']}>
    <details className={styles.details}>
      <summary>
        <Typography
          style={{ display: 'inline-block' }}
          className={styles.subtitle}
          fontSize={30}
          fontFamily="rubik"
        >
          {title}
        </Typography>
        <Typography
          style={{ display: 'inline-block', marginLeft: '5px' }}
          color="gray_11"
          fontFamily="rubik"
        >
          (click to show)
        </Typography>
      </summary>
      <div className={styles.content}>{children}</div>
    </details>
  </div>
);

export default ListToggle;
