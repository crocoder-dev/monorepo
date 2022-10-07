import React from 'react';
import styles from './index.module.scss';
import Section from '../../Section';
import Typography from '../../Typography';

const BlogHeader = () => (
  <Section as="header" blog className={styles.whiteBackground}>
    <div className={styles.wrapper}>
      <Typography
        className={styles.title}
        element="h1"
        fontSize={56}
        fontWeight={700}
        color="gray_2"
      >
        <span className={styles.green}>Cro</span>
        Coder Blog
      </Typography>
      <Typography fontSize={24} color="gray_11">
        Tips and ideas to help you learn, build and improve your projects.
      </Typography>
    </div>
  </Section>
);
export default BlogHeader;
