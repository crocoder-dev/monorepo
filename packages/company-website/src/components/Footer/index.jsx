import React from 'react';
import * as styles from './index.module.scss';
import Icon from '../Icon';
import Typography from '../Typography';
import logoFooter from '../../content/images/logoFooter.png';
import ResponsiveImage from '../ResponsiveImage';

import footer from '../../content/footer.json';

const Footer = ({ scrollToTop }) => (
  <footer className={styles.footer}>
    <div className={styles.footer__grid}>
      <div className={styles.footer__logo}>
        <a
          href="/"
          onClick={() => {
            if (scrollToTop) scrollToTop();
          }}
          aria-label={footer.home.ariaLabel}
        >
          <div
            className={styles.image}
            style={{ visibility: 'visible' }}
            aria-hidden="true"
          >
            <ResponsiveImage src={logoFooter} alt={footer.home.ariaLabel} />
          </div>
        </a>
      </div>
      <div className={styles.footer__content}>
        <a href="/" style={{ color: 'inherit' }} className="link">
          {footer.home.text}
        </a>
        <a href="/terms" style={{ color: 'inherit' }} className="link">
          {footer.terms.text}
        </a>
        <a
          href="/privacy_policy"
          style={{ color: 'inherit' }}
          className="link"
        >
          {footer.privacy.text}
        </a>
      </div>
      <div className={styles.footer__social_media}>
        <div>
          {footer.socialMedia.map((mediaLink) => (
            <a
              href={mediaLink.href}
              key={mediaLink.icon}
              rel="nofollow noopener noreferrer"
              className={styles.icon}
              aria-label={mediaLink.ariaLabel}
              target="_blank"
            >
              <Icon
                aria-hidden="true"
                style={{ visibility: 'visible' }}
                color="gray_1"
                icon={mediaLink.icon}
              />
            </a>
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

export default Footer;
