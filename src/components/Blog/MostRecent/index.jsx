import styles from "./index.module.scss";
import Typography from "../../Typography";
import ResponsiveImage from "../../ResponsiveImage";
import { Post } from "../Posts";

function MostRecent({ pages }) {
  const postKeys = Object.keys(pages).filter(
    (key) => key.includes("blog") && key !== "/blog/"
  );
  const posts = postKeys.map((key) => pages[key]);

  const [featuredPost, ...restOfPosts] = posts.sort(
    (a, b) => new Date(b.meta.date) - new Date(a.meta.date)
  );

  return (
    <>
      <div className={styles.titleWrapper}>
        <Typography
          className={styles.title}
          element="h2"
          fontSize={36}
          fontWeight={700}
          color="gray_2"
        >
          Most recent posts
        </Typography>
      </div>
      <div className={styles.wrapper}>
        <article className={styles.featured_post}>
          <a href={featuredPost.urlPath}>
            <figure>
              <ResponsiveImage
                src={featuredPost.meta.image}
                alt={featuredPost.meta.title}
              />
            </figure>
            <Typography
              fontSize={14}
              fontWeight={500}
              className={`${styles.category} ${styles.text}`}
              element="div"
              color="gray_11"
              fontFamily="rubik"
            >
              {featuredPost.meta.category}
            </Typography>
            <Typography
              fontSize={24}
              className={styles.title}
              color="gray_2"
              fontWeight={700}
              fontFamily="rubik"
              element="h3"
            >
              {featuredPost.meta.title}
            </Typography>
            <Typography
              fontSize={18}
              className={styles.subtitle}
              color="gray_11"
              fontFamily="rubik"
            >
              {featuredPost.meta.description}
            </Typography>
          </a>
        </article>
        {restOfPosts.map((post) => {
          return (
            <Post
              key={post.meta.title}
              slug={post.urlPath}
              image={post.meta.image}
              title={post.meta.title}
              category={post.meta.category}
            />
          );
        })}
      </div>
    </>
  );
}
export default MostRecent;
