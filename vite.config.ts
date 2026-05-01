import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import viteCompression from "vite-plugin-compression";
// 1. Import the Tailwind plugin
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [
    react(),
    // 2. Add tailwindcss() to the plugins array
    tailwindcss(),
    viteCompression({ algorithm: 'brotliCompress' })
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
