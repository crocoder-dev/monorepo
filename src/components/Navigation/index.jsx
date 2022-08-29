import React, { useState, useEffect, useCallback } from "react";
import classnames from "classnames";
import Button from "../Button";
import styles from "./index.module.scss";
import useDevice from "../../hooks/useDevice";
import useScrollPrevent from "../../hooks/useScrollPrevent";

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
    window.addEventListener("scroll", scrollHandler);
    return () => {
      enableScroll();
      window.removeEventListener("scroll", scrollHandler);
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
      className={classnames(className, styles.header, {
        [styles.scroll]: scrolled,
        [styles.closed]: !opened,
        [styles.transparent]: transparentOnZeroScroll && !scrolled && !opened,
      })}
    >
      <div className={styles.header__image}>{Logo}</div>
      <Button
        hidden={!opened || !isMobile}
        aria-haspopup="true"
        aria-expanded={opened && isMobile}
        aria-controls="navigation-content-menu"
        aria-label="Navigation"
        variant="sneaky"
        onClick={toggleMenu}
        className={classnames(styles.header__burger, {
          [styles.active]: opened,
        })}
      >
        {isMobile && (
          <>
            <span></span>
            <span></span>
            <span></span>
          </>
        )}
      </Button>
      <ol id="navigation-content-menu" className={styles.header__content}>
        {typeof children === "function"
          ? children(toggleMenu)
          : children || null}
      </ol>
    </nav>
  );
};

export default Navigation;
