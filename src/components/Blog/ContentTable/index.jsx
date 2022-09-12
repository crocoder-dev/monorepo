import Typography from "../../Typography";

const Table = ({ tocData }) => {
  return (
    <ul>
      {tocData.map(({ value, id, children }) => (
        <li key={id}>
          <a href={`#${id}`}>{value}</a>
          {children && <Table tocData={children} />}
        </li>
      ))}
    </ul>
  );
};

const ContentTable = ({ tocData, title = "Contents" }) => {
  return (
    <>
      {title ? (
        <Typography element="h2" id="contents" fontFamily="rubik">
          {title}
        </Typography>
      ) : null}
      <Table tocData={tocData} />
    </>
  );
};

export default ContentTable;
