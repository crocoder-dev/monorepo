import { defineConfig } from 'vite';
import { plugins, build } from './vite.config';

export default defineConfig({
  publicDir: false,
  plugins,
  build,
  ssr: {
    noExternal: ['react-syntax-highlighter'],
  },
});
