import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import mdx from '@mdx-js/rollup';
import rehypeSlug from 'rehype-slug';
import remarkGfm from 'remark-gfm';
import rehypeToc from './plugins/rehype-toc';

export const plugins = [
  react(),
  mdx({
    rehypePlugins: [rehypeSlug, rehypeToc],
    remarkPlugins: [remarkGfm],
    providerImportSource: '@mdx-js/react',
  }),
];

export const build = {
  assetsInlineLimit: 0,
};

export default defineConfig({ plugins, build });
