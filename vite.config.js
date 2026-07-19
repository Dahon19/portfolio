import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  base: "/portfolio/",
  plugins: [react()],
  build: {
    rollupOptions: {
      input: {
        main: "index.html",
        app: "src/app-entry.jsx"
      }
    }
  }
});
