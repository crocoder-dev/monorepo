import React from "react";
import styles from "./index.module.scss";
import Typography from "../../Typography";
import ResponsiveImage from "../../ResponsiveImage";
import librariesJSON from "../../../content/component-libraries/component-libraries.json";

const ComponentLibraryTitle = ({ id, children }) => {
  const libraries = librariesJSON.componentLibraries;
  const library = libraries.find((library) => library.id === id);
  const { title, altTitle } = library;

  return (
    <div id={id} className={styles.libraryTitleWrapper}>
      <div className={styles.libraryLogo}>
        <ResponsiveImage
          src={`/src/content/images/blogs/best-react-component-library-2022/${id}.png`}
          alt={title}
        />
      </div>
      <Typography className={styles.libraryTitle} element="div">
        {children}
      </Typography>
      <Typography
        className={styles.libraryAltTitle}
        fontFamily="rubik"
        element="p"
        fontSize={20}
      >
        {`"${altTitle}"`}
      </Typography>
    </div>
  );
};

export default ComponentLibraryTitle;
