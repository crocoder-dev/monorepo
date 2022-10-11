import React from 'react';
import Section from '../../Section';
import Typography from '../../Typography';
import ResponsiveImage from '../../ResponsiveImage';
import styles from './index.module.scss';

const About = ({ author }) => (
  <Section blog as="footer" className={styles.about}>
    <div className={styles['author-avatar']} style={{ backgroundColor: `${author.bgColor}` }}>
      <ResponsiveImage src={`/src/content/images/authors/${author.id}.png`} alt={author.name} />
    </div>
    <div className={styles['author-info']}>
      <Typography element="p" fontFamily="roboto" color="gray_2" fontWeight={400} fontSize={14}>
        AUTHOR
      </Typography>
      <Typography
        element="p"
        fontFamily="rubik"
        color="gray_2"
        fontWeight={700}
        fontSize={16}
        className={styles['author-name']}
      >
        {author.name}
      </Typography>
      <Typography fontFamily="rubik" color="gray_11" fontSize={14}>
        {author.description}
      </Typography>
      {author.twitter || author.linkedin ? (
        <Typography fontFamily="rubik" color="gray_11" fontSize={14}>
          {` Connect with ${author.name.slice(0, author.name.indexOf(' '))} on `}
          {author.twitter && (
            <a
              rel="nofollow noopener noreferrer"
              className="link"
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
              className="link"
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
  </Section>
);

export default About;
