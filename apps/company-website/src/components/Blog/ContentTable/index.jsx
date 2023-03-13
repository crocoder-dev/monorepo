import React from 'react';
import styles from './index.module.scss';
import Typography from '../../Typography';
import BlogLink from '../BlogLink';

const Table = ({ tocData }) => (
  <ul className={styles.table}>
    {tocData?.map(({ value, id, children }) => (
      <li key={id}>
        <BlogLink toc href={`#${id}`}>{value}</BlogLink>
        {children && <Table tocData={children} />}
      </li>
    ))}
  </ul>
);

const ContentTable = ({ tocData, title = 'Contents' }) => (
  <>
    {title ? (
      <Typography
        element="h2"
        id="contents"
        fontFamily="rubik"
        color="gray_2"
        className={styles['content-title']}
      >
        {title}
      </Typography>
    ) : null}
    <Table tocData={tocData} />
  </>
);

export default ContentTable;
