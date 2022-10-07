import React from 'react';
import Typography from '../../Typography/Typography';
import styles from './index.module.scss';

const NonHSubtitle = ({ children, ...other }) => (
  <Typography
    element="div"
    className={styles.subtitle}
    fontFamily="rubik"
    fontSize={30}
    {...other}
  >
    {children}
  </Typography>
);

export default NonHSubtitle;
