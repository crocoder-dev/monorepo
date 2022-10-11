import React from 'react';
import clsx from 'clsx';
import styles from './index.module.scss';

const ResponsiveImage = ({
  src, className, alt, ...props
}) => {
  if (typeof src === 'string') {
    return (
      <img alt={alt} className={clsx(styles.image, className)} src={src} {...props} />
    );
  }

  const sources = src.slice(0, -1);
  const { srcset, ...imgProps } = src[src.length - 1];

  return (
    <picture>
      {sources.map((source, i) => {
        const { srcset: s, ...sourceProps } = source;
        // eslint-disable-next-line react/no-array-index-key
        return <source srcSet={s} key={i} {...sourceProps} />;
      })}
      <img
        alt={alt}
        className={clsx(styles.image, className)}
        srcSet={srcset}
        {...imgProps}
        {...props}
      />
    </picture>
  );
};

export default ResponsiveImage;
