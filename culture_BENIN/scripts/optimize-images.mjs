// Converts local raster images (jpg/png) to .webp alongside the originals.
//
// This is currently a no-op: every image in the app is hotlinked from
// Wikimedia Commons via `wikimediaImage()` (src/shared/utils/wikimedia.ts),
// and `public/images` / `src/assets/images` are empty (see README.md). Wikimedia's
// `Special:FilePath` endpoint doesn't support WebP negotiation, so there is
// nothing local to compress today.
//
// This script becomes useful once real local image assets exist — e.g. once
// ContributePage uploads go to a real backend/storage, or admin media moves
// off Wikimedia — run it with `pnpm optimize-images`.

import { readdir, stat } from "node:fs/promises";
import { extname, join } from "node:path";
import sharp from "sharp";

const TARGET_DIRS = ["public/images", "src/assets/images"];
const SOURCE_EXTENSIONS = new Set([".jpg", ".jpeg", ".png"]);
const WEBP_QUALITY = 82;

async function collectImageFiles(dir) {
  let entries;
  try {
    entries = await readdir(dir, { withFileTypes: true });
  } catch {
    return [];
  }

  const files = [];
  for (const entry of entries) {
    const fullPath = join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...(await collectImageFiles(fullPath)));
    } else if (SOURCE_EXTENSIONS.has(extname(entry.name).toLowerCase())) {
      files.push(fullPath);
    }
  }
  return files;
}

async function convertToWebp(sourcePath) {
  const webpPath = sourcePath.replace(extname(sourcePath), ".webp");
  try {
    await stat(webpPath);
    console.log(`skip (already converted): ${sourcePath}`);
    return;
  } catch {
    // no existing .webp — proceed with conversion
  }

  await sharp(sourcePath).webp({ quality: WEBP_QUALITY }).toFile(webpPath);
  console.log(`converted: ${sourcePath} -> ${webpPath}`);
}

async function main() {
  const files = (await Promise.all(TARGET_DIRS.map(collectImageFiles))).flat();

  if (files.length === 0) {
    console.log(
      "No local images found in public/images or src/assets/images — nothing to optimize yet.",
    );
    return;
  }

  for (const file of files) {
    await convertToWebp(file);
  }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
