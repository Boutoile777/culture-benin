import { fileURLToPath } from "node:url";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

const BACKEND_URL = "https://cultureplusbenin-backend-nestjs.onrender.com";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  server: {
    proxy: {
      // Dev-only workaround: the backend doesn't send CORS headers yet, so
      // requests are proxied server-side (no browser CORS involved) instead
      // of calling the backend directly from the browser. Remove once the
      // backend enables CORS. See VITE_API_BASE_URL in .env.development.
      "/api": {
        target: BACKEND_URL,
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
    },
  },
});
