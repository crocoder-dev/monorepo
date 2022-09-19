import React from "react";
import styles from "./index.module.scss";
import Typography from "../../Typography";
import Section from "../../Section";
import ResponsiveImage from "../../ResponsiveImage";
import clsx from "clsx";
import authors from "../../../content/authors/authors.json";

const QuoteCard = ({
  direction,
  children,
  "author-color": authorBgColor,
  "author-name": authorName,
}) => {
  const { name, role, id } = authors.find((author) => author.id === authorName);

  return (
    <Section
      className={clsx(styles.quoteCard, {
        [styles.leftDirection]: direction !== "right",
      })}
    >
      <figure className={styles.figureWrapper}>
        <div
          style={{ backgroundColor: authorBgColor }}
          className={styles.authorImageWrapper}
        >
          <ResponsiveImage
            src={`/src/content/images/authors/${id}.png`}
            alt={name}
          />
        </div>
        <Typography
          fontFamily="rubik"
          fontWeight={300}
          element={"blockquote"}
          fontSize={22}
          className={styles.quoteBody}
        >
          {children}
        </Typography>
        <figcaption className={styles.authorDetails}>
          <Typography
            className={styles.author}
            element="p"
            fontFamily="rubik"
            fontWeight={700}
            fontSize={22}
          >
            {name}
          </Typography>
          <Typography
            className={styles.role}
            element="p"
            fontFamily="rubik"
            fontWeight={500}
            fontSize={14}
          >
            {role}
          </Typography>
        </figcaption>
      </figure>
    </Section>
  );
};

export default QuoteCard;
