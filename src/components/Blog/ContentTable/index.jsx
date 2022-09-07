import Typography from "../../Typography";

const ContentTable = ({ tocData, title = "Contents" }) => {
  const getToc = (data) => {
    let tocElems = [];

    data.forEach((dataItem) => {
      dataItem.hasOwnProperty("children")
        ? tocElems.push(
            <li key={dataItem.id}>
              <a href={`#${dataItem.id}`}>{dataItem.value}</a>

              <ul>{getToc(dataItem.children)}</ul>
            </li>
          )
        : dataItem.value !== title && dataItem.value !== "Recommended Posts"
        ? tocElems.push(
            <li key={dataItem.id}>
              <a href={`#${dataItem.id}`}>{dataItem.value}</a>
            </li>
          )
        : null;
    });

    return tocElems;
  };

  return (
    <ul>
      {title ? (
        <Typography element="h2" id="contents" fontFamily="rubik">
          {title}
        </Typography>
      ) : null}
      {getToc(tocData)}
    </ul>
  );
};

export default ContentTable;
