import styles from './index.module.scss';
import Typography from '../../Typography';
import ResponsiveImage from '../../ResponsiveImage';
import clsx from 'clsx';
import authors from '../../../content/authors/authors.json';

export const Post = ({ meta, urlPath }) => {
  const author = authors.find((author) => author.id === meta.author);
  
  return (
    <article className={styles.post}>
      <figure>
        <ResponsiveImage src={meta.image} alt={meta.title} />
        <figcaption>
          <Typography
            fontSize={12}
            fontWeight={500}
            className={clsx(styles.category)}
            element="span"
            color="gray_11"
            fontFamily="rubik"
          >
            {meta.category}
          </Typography>
          <Typography
            fontSize={12}
            fontWeight={500}
            className={clsx(styles.category, styles['date-updated'])}
            element="span"
            color="gray_11"
            fontFamily="rubik"
          >
            {new Date(meta.updatedAt).toLocaleDateString('en-GB', {
              day: 'numeric',
              month: 'short',
              year: 'numeric',
            })}
          </Typography>
          <Typography
            element="h3"
            color="gray_2"
            fontSize={24}
            className={styles.title}
            fontWeight={700}
            fontFamily="rubik"
          >
            {meta.title}
          </Typography>
        </figcaption>
      </figure>
      <footer>
        <div>
          <div style={{ backgroundColor: `${author.bgColor}` }} className={styles.authorImage}>
            <ResponsiveImage src={`/src/content/images/authors/${author.id}.png`} />
          </div>
          <Typography
            element="p"
            color="gray_3"
            fontWeight={600}
            fontSize={18}
            className={styles.authorName}
          >
            {author.name}
          </Typography>
          <Typography
            element="p"
            color="gray_3"
            fontWeight={300}
            fontSize={12}
            className={styles.authorRole}
          >
            {author.role}
          </Typography>
        </div>
        <a href={urlPath} className="link">
          Read More
        </a>
      </footer>
    </article>
  );
};

const Posts = ({ posts }) => {
  return (
    <div className={styles.wrapper}>
      {posts && posts.map((p) => <Post key={p.urlPath} {...p} />)}
    </div>
  );
};

export default Posts;
