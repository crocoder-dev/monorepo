import React from 'react';
import Typography from '../Typography';
import ResponsiveImage from '../ResponsiveImage';
import * as styles from './index.module.scss';
import Section from '../Section';

const HowWeWork = ({ title, content }) => (
  <Section as="section">
    <Typography element="h2" fontSize={36} fontWeight={700} textAlign="center" color="gray_2">
      {title}
    </Typography>
    <div>
      {content.map((sectionContent) => (
        <div key={sectionContent.title} className={styles.flex}>
          <div className={styles.flex__text}>
            <Typography color="gray_2" element="h3" fontSize={26} fontWeight={600}>
              {sectionContent.title}
            </Typography>
            <Typography
              element="p"
              color="gray_2"
              fontSize={18}
              className={styles.flex__description}
              dangerouslySetInnerHTML={{ __html: sectionContent.text }}
            />
          </div>
          <div className={styles.flex__image}>
            <ResponsiveImage
              src={sectionContent.image}
              alt={sectionContent.imageAlt}
              width={300}
              height={300}
            />
          </div>
        </div>
      ))}
    </div>
  </Section>
);

export default HowWeWork;
