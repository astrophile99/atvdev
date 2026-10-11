import { defineConfig } from "vite";

export default defineConfig({
  build: {
    // three.js is most of the bundle (~200 kB gzipped) and is needed on first paint.
    chunkSizeWarningLimit: 800,
  },
});
