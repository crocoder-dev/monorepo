import React from "react";
import styles from "./index.module.scss";
import Typography from "../../Typography";
import Section from "../../Layout/Section";
// TODO: Remove -import Image from "next/image";

const Header = ({ image, title, author, lastUpdatedAt }) => {
  const formatDate = (date) => {
    let d = new Date(date);
    let month = (d.getMonth() + 1).toString();
    let day = d.getDate().toString();
    let year = d.getFullYear();
    if (month.length < 2) {
      month = "0" + month;
    }
    if (day.length < 2) {
      day = "0" + day;
    }
    return [year, month, day].join("-");
  };

  return (
    <Section blog as="header" className={styles.header}>
      <Image
        loader={({ src }) => src}
        src={image.src}
        alt={title}
        layout="responsive"
        width={image.width}
        height={image.height}
      />
      <Typography
        element="h1"
        fontSize={50}
        fontWeight={700}
        fontFamily="rubik"
        color="gray_2"
      >
        {title}
      </Typography>
      <div className={styles.authorHeaderWrapper}>
        <Typography
          fontFamily="rubik"
          color="gray_11"
          className={styles.authorWrittenBy}
        >
          Written by {author.name}
        </Typography>
        <Typography
          dateTime={formatDate(lastUpdatedAt)}
          element="time"
          fontFamily="rubik"
          color="gray_11"
          className={styles.lastUpdated}
        >
          Last updated:{" "}
          {new Date(lastUpdatedAt).toLocaleDateString(undefined, {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </Typography>
      </div>
    </Section>
  );
};

export default Header;
