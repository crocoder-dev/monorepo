import { useState, useEffect, useMemo } from "react";
import {
  desktop,
  tabletPortrait,
  mobile,
  viewportLimit,
} from "../styles/main.module.scss";

/**
 * Custom hook for screen-size detection in components.
 */
export default function useDevice(custom) {
  const mobileLimit = useMemo(() => (custom && custom.mobile) || Number(mobile.replace("px", "")), [custom]);
  const tabletLimit = useMemo(() => (custom && custom.tablet) || Number(tabletPortrait.replace("px", "")), [custom]);
  const desktopLimit = useMemo(() => (custom && custom.desktop) || Number(desktop.replace("px", "")), [custom]);
  const largeDesktopLimit = useMemo(() => (custom && custom.largeDesktop) || Number(viewportLimit.replace("px", "")), [custom]);
    

  const [isMobile, setIsMobile] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);
  const [isTablet, setIsTablet] = useState(false);
  const [isLargeDesktop, setIsLargeDesktop] = useState(false);


  useEffect(() => {
    const checkIsMobile = () =>
      window.innerWidth < tabletLimit && window.innerWidth >= mobileLimit;
    const checkIsTablet = () =>
      window.innerWidth >= tabletLimit && window.innerWidth < desktopLimit;
    const checkIsDesktop = () => window.innerWidth >= desktopLimit;
    const checkIsLargeDesktop = () => window.innerWidth > largeDesktopLimit;

    setIsMobile(checkIsMobile());
    setIsDesktop(checkIsTablet());
    setIsTablet(checkIsDesktop());
    setIsLargeDesktop(checkIsLargeDesktop());

    const resizeHanlder = () => {
      setIsMobile(checkIsMobile());
      setIsDesktop(checkIsTablet());
      setIsTablet(checkIsDesktop());
      setIsLargeDesktop(checkIsLargeDesktop());
    };

    window.addEventListener("resize", resizeHanlder);
    return () => window.removeEventListener("resize", resizeHanlder);
  }, [desktopLimit, largeDesktopLimit, mobileLimit, tabletLimit]);

  return { isMobile, isDesktop, isTablet, isLargeDesktop };
}
