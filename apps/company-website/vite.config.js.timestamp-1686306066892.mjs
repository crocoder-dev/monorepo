// vite.config.js
import { defineConfig } from "file:///home/luka/Desktop/projects/monorepo/node_modules/vite/dist/node/index.js";
import react from "file:///home/luka/Desktop/projects/monorepo/apps/company-website/node_modules/@vitejs/plugin-react/dist/index.mjs";
import mdx from "file:///home/luka/Desktop/projects/monorepo/node_modules/@mdx-js/rollup/index.js";
import rehypeSlug from "file:///home/luka/Desktop/projects/monorepo/node_modules/rehype-slug/index.js";
import remarkGfm from "file:///home/luka/Desktop/projects/monorepo/node_modules/remark-gfm/index.js";
import imagePresets, { widthPreset } from "file:///home/luka/Desktop/projects/monorepo/node_modules/vite-plugin-image-presets/dist/index.js";
import rehypeToc from "file:///home/luka/Desktop/projects/monorepo/packages/rehype-toc/index.mjs";
var plugins = [
  react(),
  mdx({
    rehypePlugins: [rehypeSlug, rehypeToc],
    remarkPlugins: [remarkGfm],
    providerImportSource: "@mdx-js/react"
  }),
  imagePresets({
    responsive: widthPreset({
      widths: [450, 800, 1e3],
      sizes: "(min-width: 800px) 1000px, (min-width: 450px) 800px 400px",
      formats: {
        webp: { quality: 60 },
        png: { quality: 40 }
      }
    })
  })
];
var build = {
  assetsInlineLimit: 0
};
var vite_config_default = defineConfig({ plugins, build });
export {
  build,
  vite_config_default as default,
  plugins
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcuanMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCIvaG9tZS9sdWthL0Rlc2t0b3AvcHJvamVjdHMvbW9ub3JlcG8vYXBwcy9jb21wYW55LXdlYnNpdGVcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIi9ob21lL2x1a2EvRGVza3RvcC9wcm9qZWN0cy9tb25vcmVwby9hcHBzL2NvbXBhbnktd2Vic2l0ZS92aXRlLmNvbmZpZy5qc1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vaG9tZS9sdWthL0Rlc2t0b3AvcHJvamVjdHMvbW9ub3JlcG8vYXBwcy9jb21wYW55LXdlYnNpdGUvdml0ZS5jb25maWcuanNcIjtpbXBvcnQgeyBkZWZpbmVDb25maWcgfSBmcm9tICd2aXRlJztcbmltcG9ydCByZWFjdCBmcm9tICdAdml0ZWpzL3BsdWdpbi1yZWFjdCc7XG5pbXBvcnQgbWR4IGZyb20gJ0BtZHgtanMvcm9sbHVwJztcbmltcG9ydCByZWh5cGVTbHVnIGZyb20gJ3JlaHlwZS1zbHVnJztcbmltcG9ydCByZW1hcmtHZm0gZnJvbSAncmVtYXJrLWdmbSc7XG5pbXBvcnQgaW1hZ2VQcmVzZXRzLCB7IHdpZHRoUHJlc2V0IH0gZnJvbSAndml0ZS1wbHVnaW4taW1hZ2UtcHJlc2V0cyc7XG5pbXBvcnQgcmVoeXBlVG9jIGZyb20gJ0Bjcm9jb2Rlci1kZXYvcmVoeXBlLXRvYyc7XG5cbmV4cG9ydCBjb25zdCBwbHVnaW5zID0gW1xuICByZWFjdCgpLFxuICBtZHgoe1xuICAgIHJlaHlwZVBsdWdpbnM6IFtyZWh5cGVTbHVnLCByZWh5cGVUb2NdLFxuICAgIHJlbWFya1BsdWdpbnM6IFtyZW1hcmtHZm1dLFxuICAgIHByb3ZpZGVySW1wb3J0U291cmNlOiAnQG1keC1qcy9yZWFjdCcsXG4gIH0pLFxuICBpbWFnZVByZXNldHMoe1xuICAgIHJlc3BvbnNpdmU6IHdpZHRoUHJlc2V0KHtcbiAgICAgIHdpZHRoczogWzQ1MCwgODAwLCAxMDAwXSxcbiAgICAgIHNpemVzOiAnKG1pbi13aWR0aDogODAwcHgpIDEwMDBweCwgKG1pbi13aWR0aDogNDUwcHgpIDgwMHB4IDQwMHB4JyxcbiAgICAgIGZvcm1hdHM6IHtcbiAgICAgICAgd2VicDogeyBxdWFsaXR5OiA2MCB9LFxuICAgICAgICBwbmc6IHsgcXVhbGl0eTogNDAgfSxcbiAgICAgIH0sXG4gICAgfSksXG4gIH0pLFxuXTtcblxuZXhwb3J0IGNvbnN0IGJ1aWxkID0ge1xuICBhc3NldHNJbmxpbmVMaW1pdDogMCxcbn07XG5cbmV4cG9ydCBkZWZhdWx0IGRlZmluZUNvbmZpZyh7IHBsdWdpbnMsIGJ1aWxkIH0pO1xuIl0sCiAgIm1hcHBpbmdzIjogIjtBQUE2VixTQUFTLG9CQUFvQjtBQUMxWCxPQUFPLFdBQVc7QUFDbEIsT0FBTyxTQUFTO0FBQ2hCLE9BQU8sZ0JBQWdCO0FBQ3ZCLE9BQU8sZUFBZTtBQUN0QixPQUFPLGdCQUFnQixtQkFBbUI7QUFDMUMsT0FBTyxlQUFlO0FBRWYsSUFBTSxVQUFVO0FBQUEsRUFDckIsTUFBTTtBQUFBLEVBQ04sSUFBSTtBQUFBLElBQ0YsZUFBZSxDQUFDLFlBQVksU0FBUztBQUFBLElBQ3JDLGVBQWUsQ0FBQyxTQUFTO0FBQUEsSUFDekIsc0JBQXNCO0FBQUEsRUFDeEIsQ0FBQztBQUFBLEVBQ0QsYUFBYTtBQUFBLElBQ1gsWUFBWSxZQUFZO0FBQUEsTUFDdEIsUUFBUSxDQUFDLEtBQUssS0FBSyxHQUFJO0FBQUEsTUFDdkIsT0FBTztBQUFBLE1BQ1AsU0FBUztBQUFBLFFBQ1AsTUFBTSxFQUFFLFNBQVMsR0FBRztBQUFBLFFBQ3BCLEtBQUssRUFBRSxTQUFTLEdBQUc7QUFBQSxNQUNyQjtBQUFBLElBQ0YsQ0FBQztBQUFBLEVBQ0gsQ0FBQztBQUNIO0FBRU8sSUFBTSxRQUFRO0FBQUEsRUFDbkIsbUJBQW1CO0FBQ3JCO0FBRUEsSUFBTyxzQkFBUSxhQUFhLEVBQUUsU0FBUyxNQUFNLENBQUM7IiwKICAibmFtZXMiOiBbXQp9Cg==
