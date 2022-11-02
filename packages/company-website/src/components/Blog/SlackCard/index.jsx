import React from 'react';
import styles from './index.module.scss';
import NonHSubtitle from '../NonHSubtitle';
import ResponsiveImage from '../../ResponsiveImage';
import Typography from '../../Typography/Typography';
import BlogHr from '../BlogHr';
import defaultCardImage from '../../../content/images/dev-tips/crocodile-chill.png';
import logo from '../../../content/images/logo-light.png';

const SlackCard = ({
  authorImage,
  authorName,
  children,
  cardImage,
  cardImageAltText,
  cardBgColor,
  authorBgColor,
}) => (
  <section className={styles['card-wrapper']} style={{ backgroundColor: cardBgColor }}>
    <div className={styles.card}>
      <div className={styles['card-image']}>
        <ResponsiveImage src={cardImage || defaultCardImage} alt={cardImageAltText || ''} />
      </div>
      <NonHSubtitle className={styles['card-title']} fontWeight={600}>
        Tips directly from
        <span> Cro</span>
        Coder`s Slack
      </NonHSubtitle>
      <BlogHr />
      <div className={styles['card-main']}>
        <div className={styles['author-image']} style={{ backgroundColor: authorBgColor }}>
          <ResponsiveImage src={authorImage} alt={authorName} />
        </div>
        <div className={styles.comment}>
          <Typography
            element="p"
            fontWeight={600}
            color="gray_2"
            fontFamily="rubik"
            className={styles.author}
          >
            {authorName}
          </Typography>
          <div className={styles.content}>{children}</div>
        </div>
      </div>
    </div>
    <ResponsiveImage className={styles.logo} src={logo} alt="Crocoder logo" />
  </section>
);
export default SlackCard;
