import React from "react";
import styles from "./index.module.scss";
import Typography from "../../Typography";
import Section from "../../Layout/Section";
//TODO: Implement clsx - import classnames from "classnames";
import authorsJSON from "../../../content/authors/authors.json";
// TODO: Remove - import Image from "next/image";

const QuoteCard = ({
  direction,
  children,
  "author-color": authorBgColor,
  "author-name": authorName,
}) => {
  const { authors } = authorsJSON;
  const { name, role, id } = authors.find((author) => author.id === authorName);
  const authorImage = require(`../../../content/images/authors/${id}.png`);

  return (
    <Section
      className={classnames(styles.quoteCard, {
        [styles.leftDirection]: direction !== "right",
      })}
    >
      <figure className={styles.figureWrapper}>
        <div
          style={{ backgroundColor: authorBgColor }}
          className={styles.authorImageWrapper}
        >
          <div className={styles.nextImage}>
            <Image
              loader={({ src }) => src}
              src={authorImage}
              alt={name}
              layout="fill"
              objectFit="cover"
            />
          </div>
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
