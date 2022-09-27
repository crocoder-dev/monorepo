import React from 'react';
import styles from './index.module.scss';
import Section from '../../Section';
import ContentTable from '../ContentTable';
import AuthorCard from '../AuthorCard';

const Body = ({ children, toc, author }) => {
  return (
    <section className={styles.body}>
      <ContentTable tocData={toc} />
      <Section blog className={styles.bodyContent}>
        {children}
      </Section>
      <AuthorCard author={author} />
    </section>
  );
};

export default Body;
