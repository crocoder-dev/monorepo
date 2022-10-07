import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import mdx from '@mdx-js/rollup';
import rehypeSlug from 'rehype-slug';
import remarkGfm from 'remark-gfm';
import imagePresets, { widthPreset } from 'vite-plugin-image-presets';
import rehypeToc from './plugins/rehype-toc';

export const plugins = [
  react(),
  mdx({
    rehypePlugins: [rehypeSlug, rehypeToc],
    remarkPlugins: [remarkGfm],
    providerImportSource: '@mdx-js/react',
  }),
  imagePresets({
    responsive: widthPreset({
      widths: [450, 800, 1000],
      sizes: '(min-width: 800px) 1000px, (min-width: 450px) 800px 400px',
      formats: {
        webp: { quality: 60 },
        png: { quality: 40 },
        jpg: { quality: 50 },
      },
    }),
  }),
];

export const build = {
  assetsInlineLimit: 0,
};

export default defineConfig({ plugins, build });
