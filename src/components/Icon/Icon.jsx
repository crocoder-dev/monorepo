import clsx from 'clsx';
import React from 'react';
import Typography from '../Typography';
import styles from './index.module.scss';

/**
 * Basic component for rendering CroCoder icons.
 * This component uses the Typography component and has font size, color and weight capabilities.
 */
const Icon = ({
  icon, className, fontSize, fontWeight, color, ...other
}) => (
  <Typography
    {...other}
    fontSize={fontSize}
    fontWeight={fontWeight}
    color={color}
    element="span"
    className={clsx(styles.icon, styles[`icon-${icon}`], className)}
  >
    <span className="path1" />
    <span className="path2" />
    <span className="path3" />
    <span className="path4" />
  </Typography>
);

export default Icon;
