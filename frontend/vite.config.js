import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    // In development, send /api/* to the Express backend (same origin, so no CORS).
    proxy: {
      "/api": "http://127.0.0.1:5000",
    },
  },
});
