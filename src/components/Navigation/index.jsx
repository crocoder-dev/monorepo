import React, { useState, useEffect, useCallback } from 'react';
import clsx from 'clsx';
import Button from '../Button';
import ResponsiveImage from '../ResponsiveImage';
import styles from './index.module.scss';
import useDevice from '../../hooks/useDevice';
import useScrollPrevent from '../../hooks/useScrollPrevent';
import navigation from '../../content/navigation.json';
import logo from '../../content/images/logoNavigation.png';

const Navigation = ({
  className,
  children,
  style,
  Logo,
  transparentOnZeroScroll = false,
  defaultScrolled = false,
  topRef,
  ...other
}) => {
  const [scrolled, setIsScrolled] = useState(defaultScrolled || false);
  const [opened, setIsOpened] = useState(false);
  const { isMobile } = useDevice({ mobile: 1, tablet: 721 });
  const { disableScroll, enableScroll } = useScrollPrevent();

  useEffect(() => {
    const scrollHandler = () => {
      if (window.scrollY > 100 && !scrolled) {
        setIsScrolled(true);
      }
      if (window.scrollY === 0) {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', scrollHandler);
    return () => {
      enableScroll();
      window.removeEventListener('scroll', scrollHandler);
    };
  }, [enableScroll, scrolled]);

  const toggleMenu = useCallback(() => {
    setIsOpened(!opened);
    if (isMobile && !opened) {
      disableScroll();
    } else if (isMobile && !!opened) {
      enableScroll();
    }
  }, [opened, isMobile, disableScroll, enableScroll]);

  return (
    <nav
      ref={topRef}
      {...other}
      style={style}
      className={clsx(className, styles.header, {
        [styles.scroll]: scrolled,
        [styles.closed]: !opened,
        [styles.transparent]: transparentOnZeroScroll && !scrolled && !opened,
      })}
    >
      <div className={styles.header__image}>
        <a href="/">
          <ResponsiveImage src={logo} alt={navigation.home.ariaLabel} />
        </a>
      </div>
      <Button
        hidden={!opened || !isMobile}
        aria-haspopup="true"
        aria-expanded={opened && isMobile}
        aria-controls="navigation-content-menu"
        aria-label="Navigation"
        variant="sneaky"
        onClick={toggleMenu}
        className={clsx(styles.header__burger, {
          [styles.active]: opened,
        })}
      >
        {isMobile && (
          <>
            <span />
            <span />
            <span />
          </>
        )}
      </Button>
      <ol id="navigation-content-menu" className={styles.header__content}>
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
      </ol>
    </nav>
  );
};

export default Navigation;
