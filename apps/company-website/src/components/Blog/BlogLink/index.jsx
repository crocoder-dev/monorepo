import React from 'react';
import styles from './index.module.scss';

const BlogLink = ({ children, toc, href, ...other }) => {
  
  const target = toc || href[0] === '/' ? '_self' : '_blank';
  
  return (<a className={styles['blog-link']} target={target} rel="noopener noreferrer" href={href} {...other}>
    {children}
  </a>);
};

export default BlogLink;
