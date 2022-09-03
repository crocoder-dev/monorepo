// Build

import ReactDOMServer from 'react-dom/server'
import { MDXProvider } from '@mdx-js/react'
import { HeadProvider } from 'react-head'

const memoize = (fn) => {
  const cache = new Map();
  return (key, ...args) => {
    if (cache.has(key)) {
      return cache.get(key);
    } 
    const result = fn(...args);
    cache.set(key, result);
    return result;
  }
}

const GET_PAGES_KEY = Symbol('🐊');

const getPages = () => {

  const modules = import.meta.globEager('./pages/**/*.{jsx,mdx}');

  return Object.entries(modules).reduce((pages, [modulePath, page]) => {
    const filePath = modulePath.replace(/^\.\/pages/, '').replace(/(\.jsx|\.mdx)$/, '');
    const urlPath = filePath.endsWith('/index') ? filePath.replace(/index$/, '') : `${filePath}/`;
    
    pages[urlPath] = {
      Component: page.default,
      meta: page.meta,
      toc: page.toc,
      filePath,
      modulePath,
      urlPath,
    };
    return pages;
  }, {})
}

const memoizedGetPages = memoize(getPages);

export const pages = memoizedGetPages(GET_PAGES_KEY);

export const renderPage = (pathname, transformedTemplate) => {

  console.log(pathname, transformedTemplate);

  if (!pathname.endsWith('/')) pathname = `${pathname}/`;

  const headTags = [];
  const { Component, meta = {}, toc } = pages[pathname] || pages['/404/'];

  const html = ReactDOMServer.renderToString(
    <HeadProvider headTags={headTags}>
        <MDXProvider>
            <Component meta={meta} pages={pages} pathname={pathname} toc={toc} />
        </MDXProvider>
    </HeadProvider>
  );

  return {
    status: pages[pathname] ? 200 : 404,
    type: 'text/html',
    body: transformedTemplate
      .replace('<!--react-head-->', ReactDOMServer.renderToStaticMarkup(headTags))
      .replace('<!--body-->', html)
  }
}