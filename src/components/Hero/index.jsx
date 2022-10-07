import React from 'react';
import * as styles from './index.module.scss';
import Section from '../Section';
import Typography from '../Typography';
import Button from '../Button';
import ResponsiveImage from '../ResponsiveImage';

const Hero = ({
  imageAlt, title, text, action, image,
}) => (
  <Section as="header" className={styles.section}>
    <div className={styles.flex}>
      <div className={styles.image}>
        <ResponsiveImage alt={imageAlt} src={image} />
      </div>
      <div className={styles.text}>
        <Typography
          className={styles.title}
          element="h1"
          fontSize={34}
          dangerouslySetInnerHTML={{ __html: title }}
          fontWeight={400}
          color="gray_2"
        />
        <Typography
          className={styles.paragraph}
          element="p"
          fontSize={22}
          dangerouslySetInnerHTML={{ __html: text }}
          fontWeight={400}
          color="gray_2"
        />
        <a href="#contact-us">
          <Button className={styles.button} variant="primary">
            {action}
          </Button>
        </a>
      </div>
    </div>
  </Section>
);

export default Hero;
