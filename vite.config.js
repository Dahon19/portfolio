import fs from "node:fs";
import path from "node:path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

function webpConverterPlugin() {
  return {
    name: "webp-converter",
    configureServer(server) {
      server.middlewares.use("/api/save-webp", (req, res) => {
        if (req.method === "POST") {
          let body = "";
          req.on("data", (chunk) => {
            body += chunk;
          });
          req.on("end", () => {
            try {
              const { filename, base64 } = JSON.parse(body);
              const data = base64.replace(/^data:image\/webp;base64,/, "");
              const targetPath = path.resolve(process.cwd(), "src/assets/certificate-previews", filename);
              fs.writeFileSync(targetPath, Buffer.from(data, "base64"));
              console.log(`[WebP Saved] ${filename} (${Math.round(data.length * 0.75 / 1024)} KB)`);
              res.writeHead(200, { "Content-Type": "application/json" });
              res.end(JSON.stringify({ success: true }));
            } catch (err) {
              console.error(err);
              res.writeHead(500);
              res.end(err.message);
            }
          });
        }
      });
    }
  };
}

export default defineConfig({
  base: "/",
  plugins: [react(), webpConverterPlugin()],
  resolve: {
    alias: {
      "@": path.resolve(process.cwd(), "src")
    }
  }
});
