import fs from 'fs';
import fse from 'fs-extra';
import { dirname, resolve } from 'path';
import { SitemapStream, streamToPromise } from 'sitemap';
import { Readable } from 'stream';

const siteUrl = 'https://crocoder.dev';

const dir = dirname('../');

const transformedTemplate = fs.readFileSync(resolve(dir, 'dist/client/index.html'), 'utf-8');

// Copy files from dist/client to out/
fse.copySync(resolve(dir, 'dist/client'), resolve(dir, 'out/'), {
  overwrite: true,
});

const createFiles = (filePath, fileContent) => {
  const file = resolve(dir, filePath);
  const fileDir = dirname(file);

  if (fs.existsSync(fileDir)) {
    fs.writeFileSync(file, fileContent);
  } else {
    fs.mkdirSync(fileDir, {
      mode: 0o777,
      recursive: true,
    });
    fs.writeFileSync(file, fileContent);
  }
};

const renderFeeds = (feeds, renderFeed) => {
  feeds.forEach((feed) => {
    if (feed === '/feed') return;

    const { body } = renderFeed(feed, transformedTemplate);
    const filePath = `out/${feed}`;

    createFiles(filePath, body);
  });
};

const renderPages = (pages, renderPage) => {
  const assetsFiles = fs.readdirSync(resolve(dir, 'out/assets'));
  const styleFilePath = assetsFiles.find((file) => file.match(/^.*server.*\.css$/i));

  Object.entries(pages).forEach(([pathname, page]) => {
    const { body } = renderPage(pathname, transformedTemplate, {
      styles: `<link rel="stylesheet" type="text/css" href="/assets/${styleFilePath}" />`,
    });

    const filePath = page.filePath.includes('index') || page.filePath.includes('404')
      ? `out${page.filePath}.html`
      : `out${page.filePath}/index.html`;

    createFiles(filePath, body);
  });
};

const renderSitemap = (pages) => {
  const filePath = 'out/sitemap.xml';
  const links = [];
  const excludes = ['/404/', '/privacy_policy/', '/terms/'];

  Object.entries(pages).forEach(([pathname, page]) => {
    if (excludes.includes(pathname)) return;
    links.push({
      url: pathname,
      changefreq: 'monthly',
      priority: 1.0,
      lastmod: page.meta?.updatedAt ? new Date(page.meta.updatedAt) : new Date(),
      img: page.meta?.image ? [{ url: `${siteUrl}${page.meta.image[1].src}` }] : null,
    });
  });

  const stream = new SitemapStream({
    hostname: siteUrl,
    lastmodDateOnly: true,
    xmlns: {
      image: true,
    },
  });

  streamToPromise(Readable.from(links).pipe(stream))
    .then((data) => {
      createFiles(filePath, data.toString());
    })
    .catch((err) => console.log(err));
};

async function render() {
  const { renderPage, pages, feeds } = await import(resolve(dir, 'dist/server/server.js'));

  renderFeeds(feeds, renderPage);
  renderPages(pages, renderPage);
  renderSitemap(pages);
}

render();
