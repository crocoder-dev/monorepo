import React from 'react';
import siteConfig from '../../content/site-config.json';
import authors from '../../content/authors/authors.json';

const formatDate = (date) => {
  const d = new Date(date);
  let month = (d.getMonth() + 1).toString();
  let day = d.getDate().toString();
  const year = d.getFullYear();
  if (month.length < 2) {
    month = `0${month}`;
  }
  if (day.length < 2) {
    day = `0${day}`;
  }
  return [year, month, day].join('-');
};

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
}) => {
  const author = authors.find((a) => a.id === authorName);
  const editor = authors.find((a) => a.id === editorName);

  return (
    <script
      type="application/ld+json"
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          '@context': 'http://schema.org/',
          '@type': 'BlogPosting',
          mainEntityOfPage: {
            '@type': 'WebPage',
            '@id': `${url}${articleSlug}`,
          },
          author: {
            '@type': 'Person',
            name: author.name,
          },
          publisher: {
            '@type': 'Organization',
            name: companyName,
            logo: {
              '@type': 'ImageObject',
              url: companyLogo,
            },
          },
          editor: {
            '@type': 'Person',
            name: editor.name,
          },
          image: {
            '@type': 'imageObject',
            url: articleImageUrl,
            height: articleImageHeight,
            width: articleImageWidth,
          },
          name: articleName,
          headline: articleHeadline,
          articleBody,
          about: articleAbout,
          abstract: articleAbstract,
          dateCreated: formatDate(articleDateCreated),
          datePublished: formatDate(articleDatePublished),
          dateModified: formatDate(articleDateModified),
          sharedContent: [],
        }),
      }}
    />
  );
};
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
