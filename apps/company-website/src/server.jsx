// Build
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import path from 'path';
import Head from './components/Head';
import createFeed from './feed';

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

const GET_PAGES_KEY = Symbol('🐊');

const getPages = () => {
  const modules = import.meta.globEager('./pages/**/*.{jsx,mdx}');

  return Object.entries(modules).reduce((pages, [modulePath, page]) => {
    const filePath = modulePath.replace(/^\.\/pages/, '').replace(/(\.jsx|\.mdx)$/, '');
    const urlPath = filePath.endsWith('/index') ? filePath.replace(/index$/, '') : `${filePath}/`;

    return {
      ...pages,
      [urlPath]: {
        Component: page.default,
        meta: page.meta,
        toc: page.toc,
        filePath,
        modulePath,
        urlPath,
      },
    };
  }, {});
};

const memoizedGetPages = memoize(getPages);

export const pages = memoizedGetPages(GET_PAGES_KEY);

export const feeds = ['/feed', '/feed.json', '/feed.xml'];

const renderFeeds = (pathname) => {
  let feedType = null;

  switch (path.extname(pathname)) {
    case '.json':
      feedType = 'json';
      break;
    case '.xml':
      feedType = 'rss';
      break;
    default:
      feedType = 'rss';
  }

  const [body, type] = createFeed(pages, feedType);

  return {
    status: 200,
    type,
    body,
  };
};

export const renderPage = (pathname, transformedTemplate, { styles } = { styles: null }) => {
  if (feeds.includes(pathname)) {
    return renderFeeds(pathname);
  }
  // eslint-disable-next-line no-param-reassign
  if (!pathname.endsWith('/')) pathname = `${pathname}/`;

  const { Component, meta = {}, toc } = pages[pathname] || pages['/404/'];

  const html = ReactDOMServer.renderToString(
    <Component meta={meta} pages={pages} pathname={pathname} toc={toc} />,
  );

  const headTags = ReactDOMServer.renderToStaticMarkup(
    <Head pageContent={html} meta={meta} slug={pathname} />,
  );

  return {
    status: pages[pathname] ? 200 : 404,
    type: 'text/html',
    body: transformedTemplate
      .replace('<!--react-head-->', headTags)
      .replace('<!--body-->', html)
      .replace('<!--styles-->', styles),
  };
};
