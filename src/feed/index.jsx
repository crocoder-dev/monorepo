import { Feed } from "feed";
import siteConfig from "../content/site-config.json";
import authors from "../content/authors/authors.json";
import ReactDOMServer from "react-dom/server";

const { siteTitle, siteDescription, siteUrl } = siteConfig;

const createFeed = (pages, type = "rss") => {
  
  const feed = new Feed({
    title: siteTitle,
    description: siteDescription,
    id: siteUrl,
    link: siteUrl,
    language: "en",
    image: "", //TODO: Image reference?
    favicon: "", //TODO: Favicon reference?
    copyright: "Copyright © CroCoder, Inc. All rights reserved",
    generator: "CroCoder feed",
    feedLinks: {
      json: `${siteUrl}/feed.json`,
      rss: `${siteUrl}/feed.xml`
    },
    author: {
      name: "CroCoder, Inc.",
      email: "hello@crocoder.dev",
      link: "crocoder.dev",
    },
  });

  const blogKeys = Object.keys(pages).filter(
    (key) => key.includes("blog") && key !== "/blog/"
  );
  const blogs = blogKeys.map((key) => pages[key]);

  blogs.forEach((blog) => {

    const { Component } = blog;

    const blogContent = ReactDOMServer.renderToString(<Component />);

    console.log(blogContent);

    const blogAuthor = authors.authors.find(
      (author) => author.id === blog?.meta?.author
    );

    const blogContributor = authors.authors.find(
      (author) => author.id === blog?.meta?.editor
    );

    feed.addItem({
      title: blog?.meta?.title,
      id: blog?.meta?.id,
      link: `${siteUrl}${blog.urlPath}`,
      description: blog?.meta?.description,
      content: blogContent,
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
      image: "", //TODO: Image reference?
    });
  });

  switch (type) {
    case "json":
      return [feed.json1(), 'application/feed+json'];
    case "rss":
    default:
      return [feed.rss2(), 'application/rss+xml'];
  }
};

export default createFeed;
