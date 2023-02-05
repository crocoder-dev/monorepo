import React from 'react';
import { motion } from 'framer-motion';
import Typography from '../Typography';
import Section from '../Section';
import styles from './index.module.scss';
import Island from '../Island';
import Cards from './Cards';

const OurClients = ({ title, text }) => (
  <Section as={motion.section} className={styles.blue}>
    <div className={styles.section}>
      <Typography
        className={styles.title}
        element="h2"
        fontSize={36}
        fontWeight={700}
        color="gray_2"
      >
        {title}
      </Typography>
      <Typography
        className={styles.text}
        element="p"
        fontSize={18}
        fontWeight={400}
        color="gray_2"
        dangerouslySetInnerHTML={{ __html: text }}
      />
      <Island deferUntil="visible">
        <Cards />
      </Island>
    </div>
  </Section>
);

export default OurClients;
