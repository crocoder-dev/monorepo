// Build

import ReactDOMServer from "react-dom/server";
import { MDXProvider } from "@mdx-js/react";
import Code from "./components/Code";
import Head from "./components/Head";
import { OrganizationJSONLDHead } from "./components/JSONLD/OrganizationJSONLDHead";
import { BlogJSONLDHead } from "./components/JSONLD/BlogJSONLDHead";
import BlogPostingJSONLDHead from "./components/JSONLD/BlogPostingJSONLDHead";

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

export const renderPage = (pathname, transformedTemplate) => {
  if (!pathname.endsWith("/")) pathname = `${pathname}/`;

  const { Component, meta = {}, toc } = pages[pathname] || pages["/404/"];

  const html = ReactDOMServer.renderToString(
    <MDXProvider components={components}>
      <Component meta={meta} pages={pages} pathname={pathname} toc={toc} />
    </MDXProvider>
  );

  let jsonLd = [];
  switch (meta.pageType) {
    case "organization":
      jsonLd = <OrganizationJSONLDHead />;
      break;
    case "blog":
      jsonLd = <BlogJSONLDHead description={meta?.description} />;
      break;
    case "blog-posting":
      jsonLd = (
        <BlogPostingJSONLDHead
          articleSlug={pathname}
          articleName={meta.title}
          articleHeadline={meta.title}
          articleBody={html}
          articleAbout={meta.description}
          articleAbstract={meta.abstract}
          articleImageUrl={meta.image}
          articleDateCreated={meta.date}
          articleDatePublished={meta.date}
          articleDateModified={meta.updatedAt}
          authorName={meta.author}
          editorName={meta.editor}
        />
      );
      break;
    default:
      jsonLd;
  }

  const headTags = [
    <Head
      title={meta?.title}
      slug={pathname}
      description={meta?.description}
    />,
    jsonLd,
  ];

  return {
    status: pages[pathname] ? 200 : 404,
    type: "text/html",
    body: transformedTemplate
      .replace(
        "<!--react-head-->",
        ReactDOMServer.renderToStaticMarkup(headTags)
      )
      .replace("<!--body-->", html),
  };
};
