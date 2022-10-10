import mdx from '@mdx-js/rollup';
import { defineConfig } from 'vite';
import { dirname, resolve } from 'path';
import { fileURLToPath } from 'url';

import pkg from './package.json';

const external = [
  ...Object.keys(pkg.dependencies || {}),
  ...Object.keys(pkg.peerDependencies || {}),
];
// Creating regexes of the packages to make sure subpaths of the
// packages are also treated as external
const regexesOfPackages = external.map((packageName) => new RegExp(`^${packageName}(/.*)?`));

const dir = dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  publicDir: false,
  plugins: [
    mdx({
      providerImportSource: '@mdx-js/react',
    }),
  ],
  build: {
    assetsInlineLimit: 0,
    rollupOptions: {
      external: [...regexesOfPackages, /.*.(png)|(jpg)|(svg)|(json)/],
      input: {
        ssrAssets: resolve(dir, 'src/server.jsx'),
      },
    },
  },
});
