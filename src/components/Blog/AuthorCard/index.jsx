import ResponsiveImage from '../../ResponsiveImage';
import styles from './index.module.scss';
import Typography from '../../Typography';

const AuthorCard = ({ author }) => {
  return (
    <div className={styles.authorCardWrapper}>
      <figure>
        <ResponsiveImage
          style={{ backgroundColor: `${author.bgColor}` }}
          src={`/src/content/images/authors/${author.id}.png`}
          alt={author.name}
        />
        <figcaption>
          <Typography element="p" fontFamily="roboto" color="gray_2" fontWeight={400} fontSize={16}>
            AUTHOR
          </Typography>
          <Typography element="p" fontFamily="roboto" color="gray_2" fontWeight={600} fontSize={18}>
            {author.name}
          </Typography>
          <Typography
            className={styles.authorDescription}
            element="p"
            fontFamily="rubik"
            color="gray_2"
            fontWeight={500}
            fontSize={14}
          >
            {author.description}
            {` Connect with ${author.name} on `}
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
            {author.twitter && author.linkedin && ' and '}
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
          </Typography>
        </figcaption>
      </figure>
    </div>
  );
};
export default AuthorCard;
