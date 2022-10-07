import React from 'react';
import clsx from 'clsx';
import styles from './index.module.scss';
import Typography from '../../Typography';
import ResponsiveImage from '../../ResponsiveImage';

export const Post = ({ meta, urlPath }) => (
  <article>
    <a href={urlPath} className={styles.post}>
      <figure>
        <ResponsiveImage src={meta.image} alt={meta.title} />
      </figure>
      <Typography
        fontSize={12}
        fontWeight={500}
        className={clsx(styles.category, styles.text)}
        element="div"
        color="gray_11"
        fontFamily="rubik"
      >
        {meta.category}
      </Typography>
      <Typography
        element="h3"
        color="gray_2"
        fontSize={24}
        className={styles.title}
        fontWeight={700}
        fontFamily="rubik"
      >
        {meta.title}
      </Typography>
    </a>
  </article>
);

const Posts = ({ posts }) => (
  <div className={styles.wrapper}>
    {posts && posts.map((p) => <Post key={p.urlPath} {...p} />)}
  </div>
);

export default Posts;
