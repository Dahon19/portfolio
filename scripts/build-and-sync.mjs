import { build } from "vite";
import fs from "node:fs/promises";
import path from "node:path";

const rootDir = process.cwd();
const distDir = path.join(rootDir, "dist");

function findAsset(assetNames, pattern) {
  return assetNames.find((name) => pattern.test(name));
}

async function rewriteProductionReferences(assetNames) {
  const appStylesheet = findAsset(assetNames, /\.css$/) ?? "styles.css";
  const appEntry = findAsset(assetNames, /^(main|app)-.*\.js$/) ?? findAsset(assetNames, /\.js$/) ?? "main.js";

  const replacements = [
    {
      pattern: /(?:\/portfolio)?\/assets\/(?:app|styles)-[^"\s+;]+\.css(?:(?:"\s*\+\s*Date\.now\(\))|\?[^"]*)?/g,
      value: `/assets/${appStylesheet}`,
    },
    {
      pattern: /(?:\/portfolio)?\/assets\/(?:app|main|styles)-[^"\s+;]+\.js(?:(?:"\s*\+\s*Date\.now\(\))|\?[^"]*)?/g,
      value: `/assets/${appEntry}`,
    },
  ];

  const filesToRewrite = [
    path.join(rootDir, "index.html"),
    path.join(rootDir, "src", "main.jsx"),
    path.join(rootDir, "src", "bootstrap.js"),
  ];

  for (const filePath of filesToRewrite) {
    try {
      let fileContent = await fs.readFile(filePath, "utf8");

      for (const replacement of replacements) {
        fileContent = fileContent.replace(replacement.pattern, replacement.value);
      }

      await fs.writeFile(filePath, fileContent);
    } catch (e) {
      console.warn("Rewrite warning for", filePath, e.message);
    }
  }
}

async function removeIfExists(targetPath) {
  await fs.rm(targetPath, { recursive: true, force: true });
}

async function copyDirectoryContents(sourceDir, targetDir) {
  const entries = await fs.readdir(sourceDir, { withFileTypes: true });

  for (const entry of entries) {
    const sourcePath = path.join(sourceDir, entry.name);
    const targetPath = path.join(targetDir, entry.name);

    if (entry.isDirectory()) {
      await fs.mkdir(targetPath, { recursive: true });
      await copyDirectoryContents(sourcePath, targetPath);
      continue;
    }

    await fs.copyFile(sourcePath, targetPath);
  }
}

async function run() {
  console.log("Building production bundle with Vite...");
  await build();
  console.log("Vite build complete. Syncing pages assets...");

  const assetsTarget = path.join(rootDir, "assets");
  await removeIfExists(assetsTarget);
  await fs.mkdir(assetsTarget, { recursive: true });

  await copyDirectoryContents(path.join(distDir, "assets"), assetsTarget);
  const assetNames = await fs.readdir(assetsTarget);
  await rewriteProductionReferences(assetNames);

  await fs.writeFile(path.join(rootDir, ".nojekyll"), "");
  console.log("Production build and sync completed successfully!");
}

run().catch((err) => {
  console.error("Build failed:", err);
  process.exitCode = 1;
});
