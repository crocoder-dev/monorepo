import styles from "./index.module.scss";
import Section from "../../Layout/Section";
import Typography from "../../Typography";

function BlogHeader() {
  return (
    <Section as="header" className={styles.whiteBackground}>
      <div className={styles.wrapper}>
        <Typography
          className={styles.title}
          element="h1"
          fontSize={56}
          fontWeight={700}
          color="gray_2"
        >
          <span className={styles.green}>Cro</span>
          Coder Blog
        </Typography>
        <Typography fontSize={24} color="gray_11">
          Tips and ideas to help you learn, build and improve your projects.
        </Typography>
      </div>
    </Section>
  );
}
export default BlogHeader;
