import Typography from "../../Typography/Typography";

export default function ContentTable({ id, headings, title = "Contents" }) {
  if (headings && id) {
    return (
      <>
        {headings[id].length > 0 ? (
          <>
            {title ? (
              <Typography element="h2" id="contents" fontFamily="rubik">
                {title}
              </Typography>
            ) : null}
            <ul>
              {headings[id]
                .filter(
                  (heading) =>
                    heading.title !== title &&
                    heading.title !== "Recommended Posts"
                )
                .map((heading) => (
                  <li key={heading.id}>
                    <a href={`#${heading.id}`}>{heading.title}</a>
                  </li>
                ))}
            </ul>
          </>
        ) : null}
      </>
    );
  }

  return null;
}
