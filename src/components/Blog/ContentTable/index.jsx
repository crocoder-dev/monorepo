import styles from './index.module.scss';
import Typography from '../../Typography';

const Table = ({ tocData }) => {
  return (
    <ul className={styles.Table}>
      {tocData.map(({ value, id, children }) => (
        <li key={id}>
          <a href={`#${id}`}>{value}</a>
          {children && <Table tocData={children} />}
        </li>
      ))}
    </ul>
  );
};

const ContentTable = ({ tocData, title = 'Contents' }) => {
  return (
    <>
      {title ? (
        <Typography
          element="h2"
          id="contents"
          fontFamily="rubik"
          color="gray_2"
          className={styles.ContentTitle}
        >
          {title}
        </Typography>
      ) : null}
      <Table tocData={tocData} />
    </>
  );
};

export default ContentTable;
