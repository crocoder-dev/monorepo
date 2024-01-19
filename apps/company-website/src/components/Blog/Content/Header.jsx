import React from 'react';
import styles from './index.module.scss';
import Typography from '../../Typography';
import ResponsiveImage from '../../ResponsiveImage';
import Section from '../../Section';

const Header = ({
  image, title, author, lastUpdatedAt, hideHeaderImage,
}) => {
  const formatDate = (date) => {
    const d = new Date(date);
    let month = (d.getMonth() + 1).toString();
    let day = d.getDate().toString();
    const year = d.getFullYear();
    if (month.length < 2) {
      month = `0${month}`;
    }
    if (day.length < 2) {
      day = `0${day}`;
    }
    return [year, month, day].join('-');
  };

  return (
    <Section blog as="header" className={styles.header}>
      {!hideHeaderImage ? (
        <ResponsiveImage src={image} alt={title} width={640} height={340} loading="eager" />
      ) : null}
      <Typography
        element="h1"
        fontSize={50}
        fontWeight={700}
        fontFamily="rubik"
        color="gray_2"
      >
        {title}
      </Typography>
      <div className={styles['author-header-wrapper']}>
        <Typography
          fontFamily="rubik"
          color="gray_11"
          className={styles['author-written-by']}
        >
          Written by
          {' '}
          {author.name}
        </Typography>
        <Typography
          dateTime={formatDate(lastUpdatedAt)}
          element="time"
          fontFamily="rubik"
          color="gray_11"
          className={styles.lastUpdated}
        >
          Last updated:
          {' '}
          {new Date(lastUpdatedAt).toLocaleDateString(undefined, {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          })}
        </Typography>
      </div>
    </Section>
  );
};

export default Header;
