/* eslint-disable import/no-unresolved */
import React from 'react';
import Section from '../../Section';
import Typography from '../../Typography';
import ResponsiveImage from '../../ResponsiveImage';
import styles from './index.module.scss';
import davidabram from '../../../content/images/authors/davidabram.png?preset=responsive';
import danicapivalicaabram from '../../../content/images/authors/danicapivalicaabram.png?preset=responsive';
import velimirujevic from '../../../content/images/authors/velimirujevic.png?preset=responsive';

const authorImages = {
  davidabram,
  danicapivalicaabram,
  velimirujevic,
};

const About = ({ author }) => (
  <Section blog as="footer" className={styles.about}>
    <div className={styles['about-wrapper']}>
      <div
        className={styles['about-avatar-wrapper']}
        style={{ backgroundColor: `${author.bgColor}` }}
      >
        <ResponsiveImage
          src={authorImages[author.id]}
          alt={author.name}
        />
      </div>
      <div className={styles['about-name']}>
        <Typography
          element="div"
          fontFamily="rubik"
          color="gray_2"
          fontWeight={700}
        >
          {author.name}
        </Typography>
        <Typography fontFamily="rubik" color="gray_11">
          {author.description}
        </Typography>
        {' '}
        <br />
        {author.twitter || author.linkedin ? (
          <Typography fontFamily="rubik" color="gray_11">
            {`Connect with ${author.name.slice(
              0,
              author.name.indexOf(' '),
            )} on `}
            {author.twitter && (
            <a
              rel="nofollow noopener noreferrer"
              className={styles.link}
              target="_blank"
              href={author.twitter}
            >
              Twitter
            </a>
            )}
            {author.twitter && author.linkedin && ' and '}
            {author.linkedin && (
            <a
              rel="nofollow noopener noreferrer"
              className={styles.link}
              target="_blank"
              href={author.linkedin}
            >
              LinkedIn
            </a>
            )}
            .
          </Typography>
        ) : null}
      </div>
    </div>
  </Section>
);

export default About;
