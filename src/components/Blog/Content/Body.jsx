import React from "react";
import styles from "./index.module.scss";
import Section from "../../Section";
import clsx from "clsx";

const Body = ({ children, bodyRef }) => {
  return (
    <Section blog as="main" ref={bodyRef} clasx={clsx(styles.body, "okaidia")}>
      {children}
    </Section>
  );
};

export default Body;
