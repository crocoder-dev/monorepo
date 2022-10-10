import React from 'react';
import { motion } from 'framer-motion';
import Typography from '../Typography';
import Section from '../Section';
import styles from './index.module.scss';
import Card from './Card';
import Island from '../Island';
import LastCard from './LastCard';

const OurClients = ({
  title, text, lastCard, cards,
}) => (
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
      <div className={styles.grid}>
        {cards.map(({
          cardTitle, image, cardText, client, imageAlt, url,
        }, index) => (
          <Island key={cardTitle} deferUntil="visible">
            <Card
              delay={3 * index}
              key={cardTitle}
              name={cardTitle}
              image={image}
              description={cardText}
              client={client}
              imageAlt={imageAlt}
              url={url}
            />
          </Island>
        ))}
        <Island deferUntil="visible">
          <LastCard lastCard={lastCard} />
        </Island>
      </div>
    </div>
  </Section>
);

export default OurClients;
