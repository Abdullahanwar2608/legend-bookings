import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import tailwindcss from "@tailwindcss/vite";
import { TanStackRouterVite } from "@tanstack/router-plugin/vite";
import tsconfigPaths from "vite-tsconfig-paths";

// Notice: vite-plugin-compression is completely gone

export default defineConfig({
  plugins: [react(), tailwindcss(), TanStackRouterVite(), tsconfigPaths()],
});
