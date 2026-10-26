import { reactRouter } from "@react-router/dev/vite";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [tailwindcss(), reactRouter()],
  resolve: {
    tsconfigPaths: true,
  },
  server: {
    proxy: {
      // docker compose sets API_URL so the web container can reach the api container
      '/api': process.env.API_URL ?? 'http://localhost:8000',
      },
    },
  });
