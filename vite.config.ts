import { vanillaExtractPlugin } from "@vanilla-extract/vite-plugin";
import react from "@vitejs/plugin-react-swc";
import { resolve } from "node:path";
import svgr from "vite-plugin-svgr";
import { defineConfig } from "vitest/config";

export default defineConfig({
  plugins: [
    react(),
    vanillaExtractPlugin(),
    svgr({
      include: "**/*.svg",
    }),
  ],
  test: {
    globals: true,
    environment: "jsdom",
  },
  resolve: {
    alias: {
      assets: resolve(import.meta.dirname, "src/assets/"),
      domains: resolve(import.meta.dirname, "src/domains/"),
      modules: resolve(import.meta.dirname, "src/modules/"),
      utils: resolve(import.meta.dirname, "src/utils/"),
      views: resolve(import.meta.dirname, "src/views/"),
      "third-parties": resolve(import.meta.dirname, "src/third-parties/"),
    },
  },
});
