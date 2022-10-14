import React from 'react';
import { motion } from 'framer-motion';
import clsx from 'clsx';
import Typography from '../../Typography';
import ResponsiveImage from '../../ResponsiveImage';
import * as styles from '../index.module.scss';

const item = (delay) => ({
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: delay } },
});

const Card = ({
  url, imageAlt, name, client, image, description,
}) => (
  <motion.div
    transition={{ duration: 0.7 }}
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 1.05 }}
    variants={item(1)}
    className={styles.card}
  >
    <a
      href={url}
      target="_blank"
      rel="noreferrer noopener"
      className={styles.flex}
    >
      <Typography
        color="gray_2"
        element="h3"
        fontSize={26}
        fontWeight={700}
        className={styles.customer__name}
      >
        {name}
      </Typography>
      <div className={clsx(styles.customer__logo, styles[client])}>
        <ResponsiveImage alt={imageAlt} src={image} />
      </div>
    </a>
    <Typography
      element="p"
      color="gray_2"
      fontSize={14}
      className={styles.customer__description}
      dangerouslySetInnerHTML={{ __html: description }}
    />
  </motion.div>
);

export default Card;
