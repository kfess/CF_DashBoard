import * as path from "path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { visualizer } from "rollup-plugin-visualizer";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), visualizer()],
  resolve: {
    // path alias (want to resolve path by absolute path)
    alias: {
      "@features": path.resolve(__dirname, "src/features/"),
      "@pages": path.resolve(__dirname, "src/pages/"),
      "@helpers": path.resolve(__dirname, "src/helpers/"),
      "@stories": path.resolve(__dirname, "src/stories/"),
      "@constants": path.resolve(__dirname, "src/constants/"),
      "@routes": path.resolve(__dirname, "src/routes/"),
      "@mock": path.resolve(__dirname, "src/mock/"),
      "@hooks": path.resolve(__dirname, "src/hooks/"),
      "@recoil": path.resolve(__dirname, "src/recoil/"),
      "@assets": path.resolve(__dirname, "src/assets/"),
      "@indexedDB": path.resolve(__dirname, "src/indexedDB/"),
      "@global": path.resolve(__dirname, "src/global/"),
    },
  },
  optimizeDeps: {
    exclude: ["node_modules"],
  },
});
