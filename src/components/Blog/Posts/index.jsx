import styles from "./index.module.scss";
import Typography from "../../Typography";
import ResponsiveImage from "../../ResponsiveImage";
import clsx from "clsx";

export const Post = ({ image, category, title, slug }) => {
  return (
    <article>
      <a href={slug} className={styles.post}>
        <figure>
          <ResponsiveImage src={image} alt={title} />
        </figure>
        <Typography
          fontSize={12}
          fontWeight={500}
          className={clsx(styles.category, styles.text)}
          element="div"
          color="gray_11"
          fontFamily="rubik"
        >
          {category}
        </Typography>
        <Typography
          element="h3"
          color="gray_2"
          fontSize={24}
          className={styles.title}
          fontWeight={700}
          fontFamily="rubik"
        >
          {title}
        </Typography>
      </a>
    </article>
  );
};

const Posts = ({ posts }) => {
  return (
    <div className={styles.wrapper}>
      {posts && posts.map((p) => <Post key={p.slug} {...p} />)}
    </div>
  );
};

export default Posts;
