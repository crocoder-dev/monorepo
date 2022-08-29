import styles from "./index.module.scss";
import Typography from "../../Typography";
// TODO: Remove -import Image from "next/image";
// TODO: Remove -import Link from "next/link";
import { Post } from "../Posts";

function MostRecent({ featuredPost = {}, posts = [] }) {
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
          <Link href={featuredPost.slug}>
            <a>
              <figure>
                <Image
                  loader={({ src, width }) => src}
                  src={featuredPost.image}
                  alt={featuredPost.title}
                  layout="responsive"
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
                {featuredPost.category}
              </Typography>
              <Typography
                fontSize={24}
                className={styles.title}
                color="gray_2"
                fontWeight={700}
                fontFamily="rubik"
                element="h3"
              >
                {featuredPost.title}
              </Typography>
              <Typography
                fontSize={18}
                className={styles.subtitle}
                color="gray_11"
                fontFamily="rubik"
              >
                {featuredPost.description}
              </Typography>
            </a>
          </Link>
        </article>
        {posts.map((post) => {
          return (
            <Post
              key={post.title}
              slug={post.slug}
              image={post.image}
              title={post.title}
              category={post.category}
            />
          );
        })}
      </div>
    </>
  );
}
export default MostRecent;
