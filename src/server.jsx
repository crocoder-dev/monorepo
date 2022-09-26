// Build

import ReactDOMServer from "react-dom/server";
import { MDXProvider } from "@mdx-js/react";
import Code from "./components/Code";
import Head from "./components/Head";
import blogPostingOverrides from "./content/blog-post-rating-overrides/blog-post-rating-overrides.json";

const components = {
  pre: ({ children }) => {
    const className = children.props.className || "";
    const matches = className.match(/language-(?<language>.*)/);

    return (
      <Code language={matches?.groups?.language ? matches.groups.language : ""}>
        {children.props.children}
      </Code>
    );
  },
};

const memoize = (fn) => {
  const cache = new Map();
  return (key, ...args) => {
    if (cache.has(key)) {
      return cache.get(key);
    }
    const result = fn(...args);
    cache.set(key, result);
    return result;
  };
};

const GET_PAGES_KEY = Symbol("🐊");

const getPages = () => {
  const modules = import.meta.globEager("./pages/**/*.{jsx,mdx}");

  return Object.entries(modules).reduce((pages, [modulePath, page]) => {
    const filePath = modulePath
      .replace(/^\.\/pages/, "")
      .replace(/(\.jsx|\.mdx)$/, "");
    const urlPath = filePath.endsWith("/index")
      ? filePath.replace(/index$/, "")
      : `${filePath}/`;

    pages[urlPath] = {
      Component: page.default,
      meta: page.meta,
      toc: page.toc,
      filePath,
      modulePath,
      urlPath,
    };
    return pages;
  }, {});
};

const memoizedGetPages = memoize(getPages);

export const pages = memoizedGetPages(GET_PAGES_KEY);

const selectRandomBlogPost = (posts, selectedPosts = []) => {
  if (posts.length === 0) {
    return [posts, selectedPosts];
  }

  const max = posts.reduce((a, b) => a + b.rating, 0);
  const selected = Math.round(Math.random() * max);

  let total = 1;
  let selectedPost = null;

  for (let i = 0; i < posts.length; i++) {
    const post = posts[i];
    if (total + post.rating > selected) {
      selectedPost = post;
      break;
    }
    total = total + post.rating;
  }

  selectedPosts.push(selectedPost);

  const remainingPosts = posts.filter(
    (post) => post.meta.id !== selectedPost.meta.id
  );

  return [remainingPosts, selectedPosts];
};

const getRecommendedPosts = (
  allPages,
  pathname,
  overridenRating = [...blogPostingOverrides],
  totalRecommendedPosts = 3
) => {
  const rating = 5;

  const blogKeys = Object.keys(allPages).filter(
    (key) => key.includes("blog") && key !== "/blog/" && key !== pathname
  );

  let blogs = blogKeys.map((key) => {
    const overridenPost = overridenRating.find(
      (post) => post.id === allPages[key].meta.id
    );
    if (overridenPost) {
      return { ...allPages[key], rating: overridenPost.rating };
    }
    return { ...allPages[key], rating };
  });

  let selectedPosts = [];

  for (let i = 0; i < totalRecommendedPosts; i++) {
    [blogs, selectedPosts] = selectRandomBlogPost(blogs, selectedPosts);
  }

  return selectedPosts;
};

export const renderPage = (pathname, transformedTemplate) => {
  if (!pathname.endsWith("/")) pathname = `${pathname}/`;

  const { Component, meta = {}, toc } = pages[pathname] || pages["/404/"];

  let recommendedPosts = null;

  if (pathname !== "/blog/" && pathname.includes("blog")) {
    recommendedPosts = getRecommendedPosts(pages, pathname);
  }

  const html = ReactDOMServer.renderToString(
    <MDXProvider components={components}>
      <Component
        meta={meta}
        pages={pages}
        pathname={pathname}
        toc={toc}
        recommendedPosts={recommendedPosts}
      />
    </MDXProvider>
  );

  const headTags = ReactDOMServer.renderToStaticMarkup(
    <Head pageContent={html} meta={meta} slug={pathname} />
  );

  return {
    status: pages[pathname] ? 200 : 404,
    type: "text/html",
    body: transformedTemplate
      .replace("<!--react-head-->", headTags)
      .replace("<!--body-->", html),
  };
};
