import styles from "./index.module.scss";
import clsx from "clsx";

const ResponsiveImage = ({ src, className, ...props }) => {
  if (typeof src === "string") {
    return (
      <img className={clsx(styles.image, className)} src={src} {...props} />
    );
  }

  const sources = src.slice(0, -1);
  const { srcset, ...imgProps } = src[src.length - 1];

  return (
    <picture>
      {sources.map((source, i) => {
        const { srcset, ...sourceProps } = source;
        return <source srcSet={srcset} key={i} {...sourceProps} />;
      })}
      <img
        className={clsx(styles.image, className)}
        srcSet={srcset}
        {...imgProps}
        {...props}
      />
    </picture>
  );
};

export default ResponsiveImage;
