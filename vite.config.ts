import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import tailwindcss from "@tailwindcss/vite";
import { TanStackRouterVite } from "@tanstack/router-plugin/vite";
import tsconfigPaths from "vite-tsconfig-paths";

// Notice: vite-plugin-compression is completely gone

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    TanStackRouterVite(),
    tsconfigPaths(),
  ],
  build: {
    // Standard minification for Vercel
    minify: "esbuild",
    reportCompressedSize: false, // Disabling this reduces build-time overhead
  },
});
