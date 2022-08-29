import React from "react";
import Section from "../../Layout/Section";
import Typography from "../../Typography";
import styles from "./index.module.scss";
// TODO: Remove -import Image from "next/image";

const About = ({ author }) => {
  const authorImage = require(`../../../content/images/authors/${author.id}.png`);
  return (
    <Section blog as="footer" className={styles.about}>
      <div className={styles.aboutWrapper}>
        <div
          className={styles.aboutAvatarWrapper}
          style={{ backgroundColor: `${author.bgColor}` }}
        >
          <Image
            loader={({ src }) => src}
            src={authorImage}
            alt={author.name}
            layout="fill"
            objectFit="cover"
          />
        </div>
        <div className={styles.aboutName}>
          <Typography
            element="div"
            fontFamily="rubik"
            color="gray_2"
            fontWeight={700}
          >
            {author.name}
          </Typography>
          <Typography fontFamily="rubik" color="gray_11">
            {author.description}
          </Typography>{" "}
          <br />
          {author.twitter || author.linkedin ? (
            <Typography fontFamily="rubik" color="gray_11">
              {`Connect with ${author.name.slice(
                0,
                author.name.indexOf(" ")
              )} on `}
              {author.twitter && (
                <a
                  rel="nofollow noopener noreferrer"
                  className="link"
                  target="_blank"
                  href={author.twitter}
                >
                  Twitter
                </a>
              )}
              {author.twitter && author.linkedin && " and "}
              {author.linkedin && (
                <a
                  rel="nofollow noopener noreferrer"
                  className="link"
                  target="_blank"
                  href={author.linkedin}
                >
                  LinkedIn
                </a>
              )}
              {"."}
            </Typography>
          ) : null}
        </div>
      </div>
    </Section>
  );
};

export default About;
