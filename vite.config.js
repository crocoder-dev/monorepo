import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import mdx from '@mdx-js/rollup';
import rehypeSlug from 'rehype-slug';
import remarkGfm from 'remark-gfm';
import rehypeToc from './plugins/rehype-toc';
import imagePresets, { widthPreset } from "vite-plugin-image-presets";

export const plugins = [
  react(),
  mdx({
    rehypePlugins: [rehypeSlug, rehypeToc],
    remarkPlugins: [remarkGfm],
    providerImportSource: "@mdx-js/react",
  }),
  imagePresets({
    hd: widthPreset({
      widths: [400, 700],
      formats: {
        original: { quality: 80 },
      }
    }),
    multi: widthPreset({
      widths: [400, 700],
      formats: {
        webp: { quality: 70 },
        png: { quality: 80 },
      }
    })
  }),
];

export const build = {
  assetsInlineLimit: 0,
};

export default defineConfig({ plugins, build });