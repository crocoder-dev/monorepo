import React, { useRef } from 'react';
import Navigation from '../../components/Navigation';
import Island from '../../components/Island';
import Footer from '../../components/Footer';
import navigation from '../../content/navigation.json';

const Layout = ({ children }) => {
  const topRef = useRef(null);

  const scrollToTop = () => topRef.current.scrollIntoView({ block: 'end' });

  return (
    <>
      <Island>
        <Navigation topRef={topRef} />
      </Island>
      {children}
      <Footer scrollToTop={scrollToTop} navigation={navigation} />
    </>
  );
};

export default Layout;
