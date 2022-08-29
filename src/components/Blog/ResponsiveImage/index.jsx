// TODO: Remove - import Image from "next/image";

const ResponsiveImage = (props) => (
  <Image
    loader={({ src }) => src}
    layout="responsive"
    alt={props.alt}
    {...props}
  />
);

export default ResponsiveImage;
