const Image = ({ src, ...props }) => {
  const { srcset, ...imgProps } = src[src.length -1];
  return <img srcSet={srcset} {...imgProps} {...props} />
};
export default Image;