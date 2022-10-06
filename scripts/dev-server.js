/* eslint-disable import/no-extraneous-dependencies */
import fs from 'fs';
import { dirname, resolve } from 'path';
import express from 'express';
import { createServer as createViteServer } from 'vite';
import chokidar from 'chokidar';

const PORT = 3000;

const dir = dirname('../');

async function createServer() {
  const app = express();
  const vite = await createViteServer({
    appType: 'custom',
    server: { middlewareMode: true },
  });
  app.use(vite.middlewares);

  let style = '';

  chokidar.watch(resolve(dir, './dist/dev/**/*.css')).on('all', (event, path) => {
    if (event === 'add' || event === 'change') {
      style = fs.readFileSync(path);
    }
  });

  app.use('/style.css', async (req, res) => {
    res.status(200).set({ 'Content-Type': 'text/css' }).end(style);
  });

  app.use('*', async (req, res) => {
    const { pathname } = new URL(`${req.protocol}://${req.get('host')}${req.originalUrl}`);
    try {
      const template = fs.readFileSync(resolve(dir, 'index.html'), 'utf-8');
      const transformedTemplate = await vite.transformIndexHtml(pathname, template);
      const { renderPage } = await vite.ssrLoadModule('/src/server.jsx');
      const { status, type, body } = renderPage(pathname, transformedTemplate, {
        styles: '<link rel="stylesheet" type="text/css" href="style.css" />',
      });
      res.status(status).set({ 'Content-Type': type }).end(body);
    } catch (e) {
      vite.ssrFixStacktrace(e);
      // eslint-disable-next-line no-console
      console.error(e);
      res.status(500).end(e.message);
    }
  });

  app.listen(PORT);

  // eslint-disable-next-line no-console
  console.log(`🐊🐊🐊 Site is now being served at: http://localhost:${PORT} 🐊🐊🐊`);
}

createServer();
