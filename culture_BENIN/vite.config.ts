import { fileURLToPath } from "node:url";
import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

const DEFAULT_BACKEND_URL = "https://cultureplusbenin-backend-nestjs.onrender.com";

export default defineConfig(({ mode }) => {
  // Cible du proxy dev /api : surchargez VITE_DEV_PROXY_TARGET dans
  // .env.development pour viser un backend local au lieu de Render.
  const env = loadEnv(mode, process.cwd(), "");
  const backendUrl = env.VITE_DEV_PROXY_TARGET || DEFAULT_BACKEND_URL;

  return {
    plugins: [react(), tailwindcss()],
    resolve: {
      alias: {
        "@": fileURLToPath(new URL("./src", import.meta.url)),
      },
    },
    build: {
      // ImmersiveTourViewer (mapillary-js) and Immersive3DViewer (three) are lazy-loaded
      // on demand (360°/3D tour buttons), not part of the initial bundle — their size
      // doesn't affect first load, so the default 500kB warning doesn't apply to them.
      chunkSizeWarningLimit: 1000,
    },
    server: {
      proxy: {
        // Dev-only workaround: the backend doesn't send CORS headers yet, so
        // requests are proxied server-side (no browser CORS involved) instead
        // of calling the backend directly from the browser. Remove once the
        // backend enables CORS. See VITE_API_BASE_URL in .env.development.
        "/api": {
          target: backendUrl,
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, ""),
        },
      },
    },
  };
});
