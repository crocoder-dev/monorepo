import styles from './index.module.scss';

const BlogLink = ({ children, ...other }) => {
  return (
    <a className={styles.blogLink} {...other}>
      {children}
    </a>
  );
};

export default BlogLink;
