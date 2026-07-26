import fs from "node:fs";
import path from "node:path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

const avatarSrc = "C:\\Users\\Dahon\\.gemini\\antigravity-ide\\brain\\daa2549b-a085-40b1-bc45-59859f9dc310\\media__1785045904261.jpg";
const avatarDestAssets = path.resolve(process.cwd(), "src/assets/rod-allen-avatar.jpg");
const avatarDestPublic = path.resolve(process.cwd(), "public/rod-allen-avatar.jpg");

try {
  if (fs.existsSync(avatarSrc)) {
    fs.mkdirSync(path.dirname(avatarDestAssets), { recursive: true });
    fs.mkdirSync(path.dirname(avatarDestPublic), { recursive: true });
    fs.copyFileSync(avatarSrc, avatarDestAssets);
    fs.copyFileSync(avatarSrc, avatarDestPublic);
  }
} catch (e) {
  console.error("Avatar copy warning:", e);
}

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
