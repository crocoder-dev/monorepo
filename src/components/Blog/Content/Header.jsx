import React from 'react';
import styles from './index.module.scss';
import Typography from '../../Typography';
import Section from '../../Section';

const Header = ({ title, category, lastUpdatedAt }) => {
  const formatDate = (date) => {
    let d = new Date(date);
    let month = (d.getMonth() + 1).toString();
    let day = d.getDate().toString();
    let year = d.getFullYear();
    if (month.length < 2) {
      month = '0' + month;
    }
    if (day.length < 2) {
      day = '0' + day;
    }
    return [year, month, day].join('-');
  };

  return (
    <header className={styles.header}>
      <Section blog className={styles.headerContent}>
        <div className={styles.blogMeta}>
          <Typography element="p" fontFamily="roboto" fontSize={18} color="gray_2">
            {category}
          </Typography>
          <span>•</span>
          <Typography
            dateTime={formatDate(lastUpdatedAt)}
            element="time"
            fontFamily="roboto"
            fontSize={18}
            color="gray_2"
            className={styles.lastUpdated}
          >
            {new Date(lastUpdatedAt).toLocaleDateString('en-GB', {
              day: 'numeric',
              month: 'long',
              year: 'numeric',
            })}
          </Typography>
        </div>
        <Typography
          className={styles.title}
          textAlign="center"
          element="h1"
          fontSize={50}
          fontWeight={700}
          fontFamily="rubik"
          color="gray_2"
        >
          {title}
        </Typography>
        <Typography
          className={styles.subtitle}
          textAlign="center"
          element="p"
          fontSize={26}
          fontWeight={300}
          fontFamily="rubik"
          color="gray_2"
        >
          A tale of how you can manage form state better
        </Typography>
      </Section>
    </header>
  );
};

export default Header;
