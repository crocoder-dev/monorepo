import React, { createRef, useRef } from "react";
import Navigation from "../../components/Navigation";
import Footer from "../../components/Footer";
import logoNavigation from "../../content/images/logoNavigation.png";
import ResponsiveImage from "../../components/ResponsiveImage";
import navigation from "../../content/navigation.json";

export const contactUsRef = createRef(null);

export const scrollToContactUs = () => contactUsRef.current.scrollIntoView();

const Layout = ({ children }) => {
  const topRef = useRef(null);

  const scrollToTop = () => topRef.current.scrollIntoView({ block: "end" });

  return (
    <>
      <Navigation
        topRef={topRef}
        Logo={
          <a href="/">
            <ResponsiveImage
              src={logoNavigation}
              alt={navigation.home.ariaLabel}
            />
          </a>
        }
      >
        {() => (
          <>
            <li className="link">
              <a href="/" className="link">
                {navigation.home.text}
              </a>
            </li>

            <li className="link">
              <a href="/blog" className="link">
                {navigation.blog.text}
              </a>
            </li>
            <li className="link">
              <a href="/contact" className="link">
                {navigation.contactUs.text}
              </a>
            </li>
          </>
        )}
      </Navigation>
      <>{children}</>
      <Footer scrollToTop={scrollToTop} navigation={navigation} />
    </>
  );
};

export default Layout;
