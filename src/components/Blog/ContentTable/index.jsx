import Typography from '../../Typography';
import styles from './index.module.scss';

const Table = ({ tocData }) => {
  return (
    <ul className={styles.table}>
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
    <aside className={styles.contentTable}>
      {title && tocData.length > 0 ? (
        <Typography
          className={styles.title}
          element="h2"
          id="contents"
          fontSize={24}
          fontWeight={600}
          fontFamily="rubik"
          color="gray_2"
        >
          {title}
        </Typography>
      ) : null}
      <Table tocData={tocData} />
    </aside>
  );
};

export default ContentTable;
