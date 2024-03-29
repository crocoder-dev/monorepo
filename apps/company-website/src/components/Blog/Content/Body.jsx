import React from 'react';
import styles from './index.module.scss';
import Section from '../../Section';

const Body = ({ children }) => (
  <Section blog as="main" className={styles.body}>
    {children}
  </Section>
);

export default Body;
