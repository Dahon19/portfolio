import fs from "node:fs/promises";
import path from "node:path";

const rootDir = process.cwd();
const distDir = path.join(rootDir, "dist");

function requireSingleAsset(assetNames, pattern, description) {
  const matches = assetNames.filter((name) => pattern.test(name));

  if (matches.length !== 1) {
    throw new Error(`Expected exactly one ${description}, found ${matches.length}.`);
  }

  return matches[0];
}

async function rewriteProductionReferences(assetNames) {
  const appStylesheet = requireSingleAsset(assetNames, /^app-.*\.css$/, "app stylesheet");
  const appEntry = requireSingleAsset(assetNames, /^app-.*\.js$/, "app entry script");
  const portraitAsset = requireSingleAsset(
    assetNames,
    /^rod-allen-profile-web-.*\.jpg$/,
    "portrait asset",
  );

  const replacements = [
    {
      pattern: /\/portfolio\/assets\/app-[^"]+\.css(?:\?[^"]*)?/g,
      value: `/portfolio/assets/${appStylesheet}`,
    },
    {
      pattern: /\/portfolio\/assets\/app-[^"]+\.js(?:\?[^"]*)?/g,
      value: `/portfolio/assets/${appEntry}`,
    },
    {
      pattern: /\/portfolio\/assets\/rod-allen-profile-web-[^"]+\.jpg(?:\?[^"]*)?/g,
      value: `/portfolio/assets/${portraitAsset}`,
    },
  ];

  const filesToRewrite = [
    path.join(rootDir, "index.html"),
    path.join(rootDir, "src", "main.jsx"),
    path.join(rootDir, "src", "bootstrap.js"),
  ];

  for (const filePath of filesToRewrite) {
    let fileContent = await fs.readFile(filePath, "utf8");

    for (const replacement of replacements) {
      fileContent = fileContent.replace(replacement.pattern, replacement.value);
    }

    await fs.writeFile(filePath, fileContent);
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

async function main() {
  const assetsTarget = path.join(rootDir, "assets");

  await removeIfExists(assetsTarget);
  await fs.mkdir(assetsTarget, { recursive: true });

  await copyDirectoryContents(path.join(distDir, "assets"), assetsTarget);
  const assetNames = await fs.readdir(assetsTarget);
  await rewriteProductionReferences(assetNames);

  await fs.writeFile(path.join(rootDir, ".nojekyll"), "");
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
