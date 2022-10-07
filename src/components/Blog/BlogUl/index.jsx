import React from 'react';
import styles from './index.module.scss';

const BlogUl = ({ children, ...other }) => (
  <ul className={styles['unordered-list']} {...other}>
    {children}
  </ul>
);

export default BlogUl;
