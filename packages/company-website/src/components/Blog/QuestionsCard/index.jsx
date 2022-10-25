import React from 'react';
import Section from '../../Section';
import Typography from '../../Typography';
import logo from '../../../content/images/logoNavigation.png';
import ResponsiveImage from '../../ResponsiveImage';
import styles from './index.module.scss';

const QuestionCard = ({ children, title }) => (
  <div className={styles['background-image']}>
    <Section className={styles['question-card']}>
      <header className={styles.header}>
        <Typography element="p" color="gray_2" fontWeight={500} fontFamily="rubik">
          {title}
        </Typography>
        <div className={styles['image-wrapper']}>
          <ResponsiveImage src={logo} alt="Crocoder logo" />
        </div>
      </header>
      {children}
    </Section>
  </div>
);

export default QuestionCard;
