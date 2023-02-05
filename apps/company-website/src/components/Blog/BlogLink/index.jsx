import React from 'react';
import styles from './index.module.scss';

const BlogLink = ({ children, toc, ...other }) => (
  <a className={styles['blog-link']} target={!toc ? '_blank' : '_self'} rel="noopener noreferrer" {...other}>
    {children}
  </a>
);

export default BlogLink;
