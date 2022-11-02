import { Feed } from 'feed';
import siteConfig from '../content/site-config.json';
import authors from '../content/authors/authors.json';

const { siteUrl } = siteConfig;

const createFeed = (pages, type = 'rss') => {
  const feed = new Feed({
    title: 'CroCoder | Blog',
    description: 'Tips and ideas to help you learn, build and improve your projects.',
    id: `${siteUrl}/blog`,
    link: `${siteUrl}/blog`,
    language: 'en',
    image: `${siteUrl}/social.png`,
    favicon: `${siteUrl}/icons/favicon.ico`,
    copyright: 'Copyright © CroCoder, Inc. All rights reserved',
    generator: 'CroCoder feed',
    feedLinks: {
      json: `${siteUrl}/feed.json`,
      rss: `${siteUrl}/feed.xml`,
    },
    author: {
      name: 'CroCoder, Inc.',
      email: 'hello@crocoder.dev',
      link: 'crocoder.dev',
    },
  });

  const blogKeys = Object.keys(pages).filter((key) => key.includes('blog') && key !== '/blog/');
  const blogs = blogKeys
    .map((key) => pages[key])
    .sort((a, b) => b.meta.updatedAt - a.meta.updatedAt);

  blogs.forEach((blog) => {
    const { meta, urlPath } = blog;

    const blogAuthor = authors.find((author) => author.id === meta?.author);

    const blogContributor = authors.find((author) => author.id === meta?.editor);

    feed.addItem({
      title: meta?.title,
      id: meta?.id,
      link: `${siteUrl}${urlPath}`,
      description: meta?.description,
      content: `<img src="${siteUrl}${meta.image[1].src}" /> ${meta?.description}`,
      author: [
        {
          name: blogAuthor?.name,
          email: blogAuthor?.email,
          link: blogAuthor?.linkedin,
        },
      ],
      contributor: [
        {
          name: blogContributor?.name,
          email: blogContributor?.email,
          link: blogContributor?.linkedin,
        },
      ],
      date: new Date(meta?.date),
      published: new Date(meta?.date),
      video: meta?.video,
      image: `${siteUrl}${meta.image[1].src}`,
      category: [
        {
          name: meta?.category,
        },
      ],
    });
  });

  switch (type) {
    case 'json':
      return [feed.json1(), 'application/feed+json'];
    case 'rss':
    default:
      return [feed.rss2(), 'application/rss+xml'];
  }
};

export default createFeed;
