import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
// 1. Import the compression plugin
import viteCompression from "vite-plugin-compression";

export default defineConfig({
    plugins: [
        react(),
        // 2. Add it to the plugins array using Brotli compression
        viteCompression({ algorithm: 'brotliCompress' })
    ],
    resolve: {
        alias: {
            "@": path.resolve(__dirname, "./src"),
        },
    },
});