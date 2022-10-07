import React from 'react';
import styles from './index.module.scss';

const BlogLink = ({ children, ...other }) => (
  <a className={styles.blogLink} {...other}>
    {children}
  </a>
);

export default BlogLink;
