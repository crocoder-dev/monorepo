import fs from 'fs';
import { dirname, resolve } from 'path';

const dir = dirname('../');

const transformedTemplate = fs.readFileSync(resolve(dir, 'dist/client/index.html'), 'utf-8');

async function render() {
  const { renderPage, pages } = await import(resolve(dir, 'dist/server/server.js'));

  Object.entries(pages).forEach(([pathname, page]) => {
    const { body } = renderPage(pathname, transformedTemplate);
    const filePath = `out${page.filePath}.html`;

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
