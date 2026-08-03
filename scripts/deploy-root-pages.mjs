import fs from "node:fs/promises";
import path from "node:path";

const portfolioDir = process.cwd();
const distDir = path.join(portfolioDir, "dist");
const pagesDir = path.resolve(portfolioDir, "..", "devdahon.github.io");
const protectedEntries = new Set([".git", ".nojekyll", "app-ads.txt", "portfolio", "src"]);

async function assertDeploymentTarget() {
  const expectedTarget = path.resolve("C:/SysProjects/devdahon.github.io");

  if (pagesDir !== expectedTarget) {
    throw new Error(`Refusing to deploy to unexpected target: ${pagesDir}`);
  }

  await fs.access(path.join(pagesDir, ".git"));
  await fs.access(path.join(pagesDir, "app-ads.txt"));
}

async function syncDist() {
  await assertDeploymentTarget();

  const entries = await fs.readdir(distDir, { withFileTypes: true });

  for (const entry of entries) {
    if (protectedEntries.has(entry.name)) {
      throw new Error(`Build output must not overwrite protected Pages entry: ${entry.name}`);
    }

    const sourcePath = path.join(distDir, entry.name);
    const targetPath = path.join(pagesDir, entry.name);

    await fs.rm(targetPath, { recursive: true, force: true });
    await fs.cp(sourcePath, targetPath, { recursive: true });
  }

  console.log(`Synced the complete portfolio build to ${pagesDir}`);
}

syncDist().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
