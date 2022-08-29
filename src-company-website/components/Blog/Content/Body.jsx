import React, { useEffect } from "react";
import styles from "./index.module.scss";
import Section from "../../Layout/Section";
import clsx from "clsx";
import Prism from "prismjs";
import "prismjs/components/prism-jsx";
import "prismjs/components/prism-bash";

const Body = ({ children, bodyRef }) => {
  useEffect(() => {
    Prism.highlightAll();
  }, [children]);
  return (
    <Section blog as="main" ref={bodyRef} clasx={clsx(styles.body, "okaidia")}>
      {children}
    </Section>
  );
};

export default Body;
