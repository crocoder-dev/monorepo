import siteConfig from "../../content/site-config.json";

const Head = ({ title, slug, description }) => {
  const pageTitle = title ? `${title} | CroCoder` : siteConfig.siteTitle;
  const pageUrl = slug ? `${siteConfig.siteUrl}${slug}` : siteConfig.siteUrl;
  const pageDescription = description || siteConfig.siteDescription;
  const socialImage = `${siteConfig.siteUrl}/social.png`;

  return [
    <meta content="IE=edge" httpEquiv="X-UA-Compatible" />,
    <link href="/manifest.json" rel="manifest" />,
    <meta content={siteConfig.themeColor} name="theme-color" />,
    <meta content={pageTitle} name="application-name" />,
    <title>{pageTitle}</title>,
    <meta content={pageDescription} name="description" />,
    <link
      href="/icons/favicon-32x32.png"
      rel="icon"
      sizes="32x32"
      type="image/png"
    />,
    <link
      href="/icons/favicon-16x16.png"
      rel="icon"
      sizes="16x16"
      type="image/png"
    />,
    <meta content={pageTitle} name="twitter:title" />,
    <meta content={pageDescription} name="twitter:description" />,
    <meta content="summary_large_image" name="twitter:card" />,
    <meta content="@crocoderdev" name="twitter:site" />,
    <meta content="@crocoderdev" name="twitter:creator" />,
    <meta content={pageTitle} name="twitter:text:title" />,
    <meta content={pageUrl} name="twitter:url" />,
    <meta content={socialImage} name="twitter:image" />,
    <meta content="1024" name="twitter:image:width" />,
    <meta content="512" name="twitter:image:height" />,
    <meta content={pageTitle} property="og:title" />,
    <meta content={pageDescription} property="og:description" />,
    <meta content="website" property="og:type" />,
    <meta content={pageTitle} property="og:site_name" />,
    <meta content={pageUrl} property="og:url" />,
    <meta content="1024" property="og:image:width" />,
    <meta content="512" property="og:image:height" />,
    <meta content={socialImage} property="og:image" />,
    <meta content={pageTitle} name="apple-mobile-web-app-title" />,
    <meta content="yes" name="apple-mobile-web-app-capable" />,
    <meta
      content="black-translucent"
      name="apple-mobile-web-app-status-bar-style"
    />,
    <link
      href="/icons/apple-touch-icon-57x57.png"
      rel="apple-touch-icon"
      sizes="57x57"
    />,
    <link
      href="/icons/apple-touch-icon-60x60.png"
      rel="apple-touch-icon"
      sizes="60x60"
    />,
    <link
      href="/icons/apple-touch-icon-72x72.png"
      rel="apple-touch-icon"
      sizes="72x72"
    />,
    <link
      href="/icons/apple-touch-icon-76x76.png"
      rel="apple-touch-icon"
      sizes="76x76"
    />,
    <link
      href="/icons/apple-touch-icon-114x114.png"
      rel="apple-touch-icon"
      sizes="114x114"
    />,
    <link
      href="/icons/apple-touch-icon-120x120.png"
      rel="apple-touch-icon"
      sizes="120x120"
    />,
    <link
      href="/icons/apple-touch-icon-144x144.png"
      rel="apple-touch-icon"
      sizes="144x144"
    />,
    <link
      href="/icons/apple-touch-icon-152x152.png"
      rel="apple-touch-icon"
      sizes="152x152"
    />,
    <link
      href="/icons/apple-touch-icon-167x167.png"
      rel="apple-touch-icon"
      sizes="167x167"
    />,
    <link
      href="/icons/apple-touch-icon-180x180.png"
      rel="icon"
      sizes="180x180"
      type="image/png"
    />,
    <meta content={siteConfig.themeColor} name="msapplication-TileColor" />,
    <meta content="/icons/mstile-70x70.png" name="msapplication-square70x70" />,
    <meta
      content="/icons/mstile-144x144.png"
      name="msapplication-square144x144"
    />,
    <meta
      content="/icons/mstile-150x150.png"
      name="msapplication-square150x150"
    />,
    <meta
      content="/icons/mstile-310x150.png"
      name="msapplication-wide310x150"
    />,
    <meta
      content="/icons/mstile-310x310.png"
      name="msapplication-square310x310"
    />,
  ];
};
export default Head;