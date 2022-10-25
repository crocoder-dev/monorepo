import React from 'react';
import clsx from 'clsx';
import styles from './index.module.scss';
import Typography from '../../Typography';
import ResponsiveImage from '../../ResponsiveImage';
import { Post } from '../Posts';

const MostRecent = ({ pages }) => {
  const postKeys = Object.keys(pages).filter(
    (key) => key.includes('blog') && key !== '/blog/',
  );
  const posts = postKeys.map((key) => pages[key]);

  const [featuredPost, ...restOfPosts] = posts.sort(
    (a, b) => new Date(b.meta.date) - new Date(a.meta.date),
  );

  return (
    <>
      <div className={styles['title-wrapper']}>
        <Typography
          className={styles.title}
          element="h2"
          fontSize={36}
          fontWeight={700}
          color="gray_2"
        >
          Most recent posts
        </Typography>
      </div>
      <div className={styles.wrapper}>
        <article className={styles['featured-post']}>
          <a href={featuredPost.urlPath}>
            <figure>
              <ResponsiveImage
                src={featuredPost.meta.image}
                alt={featuredPost.meta.title}
                loading="eager"
              />
            </figure>
            <Typography
              fontSize={14}
              fontWeight={500}
              className={clsx(styles.category, styles.text)}
              element="div"
              color="gray_11"
              fontFamily="rubik"
            >
              {featuredPost.meta.category}
            </Typography>
            <Typography
              fontSize={24}
              className={styles.title}
              color="gray_2"
              fontWeight={700}
              fontFamily="rubik"
              element="h3"
            >
              {featuredPost.meta.title}
            </Typography>
            <Typography
              fontSize={18}
              className={styles.subtitle}
              color="gray_11"
              fontFamily="rubik"
            >
              {featuredPost.meta.description}
            </Typography>
          </a>
        </article>
        {
          // eslint-disable-next-line react/jsx-props-no-spreading
          restOfPosts.map((post) => <Post key={post.meta.title} {...post} />)
        }
      </div>
    </>
  );
};
export default MostRecent;
