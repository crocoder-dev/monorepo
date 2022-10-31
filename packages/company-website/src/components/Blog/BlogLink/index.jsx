import React from 'react';
import styles from './index.module.scss';

const BlogLink = ({ children, ...other }) => (
  <a className={styles['blog-link']} target="_blank" rel="noopener noreferrer" {...other}>
    {children}
  </a>
);

export default BlogLink;
