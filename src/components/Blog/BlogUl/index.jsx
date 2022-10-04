import styles from './index.module.scss';

const BlogUl = ({ children, ...other }) => {
  return (
    <ul className={styles.unorderedList} {...other}>
      {children}
    </ul>
  );
};

export default BlogUl;
