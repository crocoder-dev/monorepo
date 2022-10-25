/* eslint-disable import/no-unresolved */
import React from 'react';
import styles from './index.module.scss';
import Typography from '../../Typography';
import ResponsiveImage from '../../ResponsiveImage';
import librariesJSON from '../../../content/component-libraries/component-libraries.json';
import materialUI from '../../../content/images/blogs/best-react-component-library-2022/material-ui.png?preset=responsive';
import ariakit from '../../../content/images/blogs/best-react-component-library-2022/ariakit.png?preset=responsive';
import antDesign from '../../../content/images/blogs/best-react-component-library-2022/ant-design.png?preset=responsive';
import reactBootstrap from '../../../content/images/blogs/best-react-component-library-2022/react-bootstrap.png?preset=responsive';
import headlessUI from '../../../content/images/blogs/best-react-component-library-2022/headless-ui.png?preset=responsive';
import radixUI from '../../../content/images/blogs/best-react-component-library-2022/radix-ui.png?preset=responsive';
import reachUI from '../../../content/images/blogs/best-react-component-library-2022/reach-ui.png?preset=responsive';
import chakraUI from '../../../content/images/blogs/best-react-component-library-2022/chakra-ui.png?preset=responsive';
import nextUI from '../../../content/images/blogs/best-react-component-library-2022/next-ui.png?preset=responsive';

const libraryImages = {
  'material-ui': materialUI,
  ariakit,
  'ant-design': antDesign,
  'react-bootstrap': reactBootstrap,
  'headless-ui': headlessUI,
  'radix-ui': radixUI,
  'reach-ui': reachUI,
  'chakra-ui': chakraUI,
  'next-ui': nextUI,
};

const ComponentLibraryTitle = ({ id, children }) => {
  const libraries = librariesJSON.componentLibraries;
  // eslint-disable-next-line no-shadow
  const library = libraries.find((library) => library.id === id);
  const { title, altTitle } = library;

  return (
    <div id={id} className={styles['library-title-wrapper']}>
      <div className={styles['library-logo']}>
        <ResponsiveImage src={libraryImages[id]} alt={title} />
      </div>
      <Typography className={styles['library-title']} element="div">
        {children}
      </Typography>
      <Typography
        className={styles['library-alt-title']}
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
