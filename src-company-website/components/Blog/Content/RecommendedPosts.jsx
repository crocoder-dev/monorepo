import React from "react";
import Section from "../../Layout/Section";
import styles from "./index.module.scss";
import Posts from "../Posts";
import Typography from "../../Typography";

const RecommendedPosts = ({ posts }) => {
  return (
    <Section blog as="nav" className={styles.recommended}>
      <Typography
        element="h2"
        fontSize={50}
        fontWeight={700}
        color="gray_2"
        className={styles.title}
      >
        Recommended Posts
      </Typography>
      <Posts posts={posts} />
    </Section>
  );
};

export default RecommendedPosts;
