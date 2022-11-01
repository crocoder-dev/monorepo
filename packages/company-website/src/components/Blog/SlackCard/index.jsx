import React from 'react';
import NonHSubtitle from '../NonHSubtitle';
import styles from './index.module.scss';
import ResponsiveImage from '../../ResponsiveImage';
import Typography from '../../Typography/Typography';
import BlogHr from '../BlogHr';
import defaultPostImage from '../../../content/images/dev-tips/crocodile-chill.png';

const SlackCard = ({
  authorImage,
  authorName,
  children,
  postImage,
  cardBgColor,
  authorBgColor,
}) => (
  <section className={styles['card-wrapper']} style={{ backgroundColor: cardBgColor }}>
    <div className={styles.card}>
      <div className={styles['post-image']}>
        <ResponsiveImage src={postImage || defaultPostImage} />
      </div>
      <NonHSubtitle className={styles['card-title']} fontWeight={600}>
        Tips directly from
        <span> Cro</span>
        Coder`s Slack
      </NonHSubtitle>
      <BlogHr />
      <div className={styles['card-main']}>
        <div className={styles['author-image']} style={{ backgroundColor: authorBgColor }}>
          <ResponsiveImage src={authorImage} />
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
  </section>
);
export default SlackCard;
