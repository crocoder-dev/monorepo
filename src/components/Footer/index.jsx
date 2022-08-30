import React from "react";
import * as styles from "./index.module.scss";
import Icon from "../Icon";
import Typography from "../Typography";
// TODO: Remove - import Link from "next/link";
import logoFooter from "../../content/images/logoFooter.png";

import footer from "../../content/footer.json";

const Footer = ({ scrollToTop }) => {
  return (
    <footer className={styles.footer}>
      <div className={styles.footer__grid}>
        <div className={styles.footer__logo}>
          <Link href="/">
            <a
              onClick={() => {
                if (scrollToTop) scrollToTop();
              }}
              aria-label={footer.home.ariaLabel}
            >
              <div
                className={styles.image}
                style={{ visibility: "visible" }}
                aria-hidden="true"
              >
                <img
                  src={logoFooter}
                  alt={footer.home.ariaLabel}
                  /* width={225}
                  height={51} */
                />
              </div>
            </a>
          </Link>
        </div>
        <div className={styles.footer__content}>
          <Link href="/">
            <a style={{ color: "inherit" }} className="link">
              {footer.home.text}
            </a>
          </Link>
          <Link href="/terms">
            <a style={{ color: "inherit" }} className="link">
              {footer.terms.text}
            </a>
          </Link>
          <Link href="/privacy_policy">
            <a style={{ color: "inherit" }} className="link">
              {footer.privacy.text}
            </a>
          </Link>
        </div>
        <div className={styles.footer__social_media}>
          <div>
            {footer.socialMedia.map((mediaLink) => (
              <Link href={mediaLink.href} key={mediaLink.icon}>
                <a
                  rel="nofollow noopener noreferrer"
                  className={styles.icon}
                  aria-label={mediaLink.ariaLabel}
                >
                  <Icon
                    aria-hidden="true"
                    style={{ visibility: "visible" }}
                    color="gray_1"
                    icon={mediaLink.icon}
                  />
                </a>
              </Link>
            ))}
          </div>
        </div>
        <div className={styles.line} />
        <Typography color="white" fontSize={12} className={styles.copyright}>
          {footer.copyrightNotice}
        </Typography>
      </div>
    </footer>
  );
};

export default Footer;
