import fs from 'fs';
import fse from 'fs-extra';
import { dirname, resolve } from 'path';

const dir = dirname('../');

const transformedTemplate = fs.readFileSync(resolve(dir, 'dist/client/index.html'), 'utf-8');

// Copy files from dist/client to out/
fse.copySync(resolve(dir, 'dist/client'), resolve(dir, 'out/'), {
  overwrite: true,
});

async function render() {
  const assetsFiles = fs.readdirSync(resolve(dir, 'out/assets'));
  const styleFilePath = assetsFiles.find((file) => file.match(/^.*server.*\.css$/i));

  const { renderPage, pages, feeds } = await import(resolve(dir, 'dist/server/server.js'));

  feeds.forEach((feed) => {
    if (feed === '/feed') return;

    const { body } = renderPage(feed, transformedTemplate);
    const filePath = `out/${feed}`;
    const file = resolve(dir, filePath);
    const fileDir = dirname(file);

    if (fs.existsSync(fileDir)) {
      fs.writeFileSync(file, body);
    } else {
      fs.mkdirSync(fileDir, {
        mode: 0o777,
        recursive: true,
      });
      fs.writeFileSync(file, body);
    }
  });

  Object.entries(pages).forEach(([pathname, page]) => {
    const { body } = renderPage(pathname, transformedTemplate, {
      styles: `<link rel="stylesheet" type="text/css" href="/assets/${styleFilePath}" />`,
    });

    const filePath = page.filePath.includes('index')
      ? `out${page.filePath}.html`
      : `out${page.filePath}/index.html`;

    const file = resolve(dir, filePath);
    const fileDir = dirname(file);

    if (fs.existsSync(fileDir)) {
      fs.writeFileSync(file, body);
    } else {
      fs.mkdirSync(fileDir, {
        mode: 0o777,
        recursive: true,
      });
      fs.writeFileSync(file, body);
    }
  });
}

render();
