import { defineConfig } from 'vite';
import { plugins, build } from './vite.config';

export default defineConfig({
  plugins,
  build,
  ssr: {
    noExternal: ['react-syntax-highlighter'],
  },
});
