import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "node:path";

export default defineConfig({
  base: "./",
  plugins: [react()],
  build: {
    outDir: "dist",
    emptyOutDir: true,
    rollupOptions: {
      input: {
        home: resolve(__dirname, "index.html"),
        privacy: resolve(__dirname, "politica-de-privacidade/index.html"),
        terms: resolve(__dirname, "termos-de-uso/index.html"),
      },
    },
  },
});
