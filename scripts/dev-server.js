import fs from 'fs';
import { dirname, resolve } from 'path';
import express from 'express';
import { createServer as createViteServer } from 'vite';

const PORT = 3000;

const dir = dirname('../');

console.log(resolve(dir, 'index.html'));

async function createServer() {
  const app = express()
  const vite = await createViteServer({
    appType: 'custom',
    server: { middlewareMode: true },
  });
  app.use(vite.middlewares);

  app.use('*', async (req, res) => {
    const { pathname } = new URL(`${req.protocol}://${req.get('host')}${req.originalUrl}`);

    try {
      const template = fs.readFileSync(resolve(dir, 'index.html'), 'utf-8');
      const transformedTemplate = await vite.transformIndexHtml(pathname, template);
      const { renderPage } = await vite.ssrLoadModule('/src/server.jsx');
      const { status, type, body } = renderPage(pathname, transformedTemplate);
      res.status(status).set({ 'Content-Type': type }).end(body);
    } catch (e) {
      vite.ssrFixStacktrace(e);
      console.error(e);
      res.status(500).end(e.message);
    }
  })

  app.listen(PORT);

  console.log(`🐊🐊🐊 Site is now being served at: http://localhost:${PORT} 🐊🐊🐊`);
}

createServer();
