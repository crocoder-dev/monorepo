import React from 'react';
import Section from '../../Section';
import styles from './index.module.scss';
import Posts from '../Posts';
import Typography from '../../Typography';

const RecommendedPosts = ({ posts }) => {
  return (
    <Section as="nav" className={styles.recommended}>
      <Typography
        element="h2"
        fontFamily="rubik"
        fontSize={26}
        fontWeight={400}
        color="gray_1"
        className={styles.title}
      >
        Recommended Posts
      </Typography>
      <Posts posts={posts} />
    </Section>
  );
};

export default RecommendedPosts;
