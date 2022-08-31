import siteConfig from "../../content/site-config.json";

const BlogPostingJSONLDHead = ({
  articleSlug,
  articleName,
  articleHeadline,
  articleBody,
  articleAbout,
  articleAbstract,
  articleImageUrl,
  articleImageHeight = 620,
  articleImageWidth = 1100,
  articleDateCreated,
  articleDatePublished,
  articleDateModified,
  authorName,
  editorName,
  companyName = siteConfig.company.name,
  companyLogo = siteConfig.logo,
  url = siteConfig.siteUrl,
}) => (
  <head>
    <script type="application/ld+json">
      {JSON.stringify({
        "@context": "http://schema.org/",
        "@type": "BlogPosting",
        mainEntityOfPage: {
          "@type": "WebPage",
          "@id": `${url}${articleSlug}`,
        },
        author: {
          "@type": "Person",
          name: authorName,
        },
        publisher: {
          "@type": "Organization",
          name: companyName,
          logo: {
            "@type": "ImageObject",
            url: companyLogo,
          },
        },
        editor: {
          "@type": "Person",
          name: editorName,
        },
        image: {
          "@type": "imageObject",
          url: articleImageUrl,
          height: articleImageHeight,
          width: articleImageWidth,
        },
        name: articleName,
        headline: articleHeadline,
        articleBody: articleBody,
        about: articleAbout,
        abstract: articleAbstract,
        dateCreated: articleDateCreated,
        datePublished: articleDatePublished,
        dateModified: articleDateModified,
        sharedContent: [],
      })}
    </script>
  </head>
);
/*
"sharedContent": [
{
"@type":"WebPage",
"headline": "Checkout this page!",
"url": "https://forum.domain.org/post/53453/",
"author":{
"@type":"Person",
"name": "Aweseom User"
}
},
{
"@type": "WebPage",
"headline": "New blogpost you should read",
"url": "https://reddit.com/url/comment/",
"author":{
"@type": "Person",
"name": "Reddit user"
}
}
],
*/

export default BlogPostingJSONLDHead;
