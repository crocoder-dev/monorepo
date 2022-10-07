import React from 'react';
import clsx from 'clsx';
import * as styles from './index.module.scss';

const Section = ({
  children, as = 'section', className, blog, ...other
}) => React.createElement(
  as,
  {
    className: clsx(className, styles.section, blog && styles.blog),
    ...other,
  },
  children,
);

export default Section;
