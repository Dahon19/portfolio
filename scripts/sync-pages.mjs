import fs from "node:fs/promises";
import path from "node:path";

const rootDir = process.cwd();
const distDir = path.join(rootDir, "dist");

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

async function main() {
  const assetsTarget = path.join(rootDir, "assets");

  await removeIfExists(assetsTarget);
  await fs.mkdir(assetsTarget, { recursive: true });

  await copyDirectoryContents(path.join(distDir, "assets"), assetsTarget);

  await fs.writeFile(path.join(rootDir, ".nojekyll"), "");
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
