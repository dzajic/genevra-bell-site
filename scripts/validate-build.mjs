import fs from "node:fs";
import path from "node:path";

const expectedImageCounts = {
  "index.html": 5,
  "work/scenes/index.html": 12,
  "work/characters/index.html": 16,
  "work/productdesign/index.html": 9,
  "work/textiledesign/index.html": 11,
  "work/print/index.html": 9,
  "about-1/index.html": 1,
  "contact/index.html": 0
};
const errors = [];

for (const [route, expectedImages] of Object.entries(expectedImageCounts)) {
  const file = path.join("_site", route);
  if (!fs.existsSync(file)) {
    errors.push(`Missing route: ${route}`);
    continue;
  }
  const html = fs.readFileSync(file, "utf8");
  const imageCount = [...html.matchAll(/<img\b/g)].length;
  if (imageCount !== expectedImages) errors.push(`Unexpected image count on ${route}: ${imageCount} (expected ${expectedImages})`);
  for (const match of html.matchAll(/(?:src|href)="(\/assets\/[^"]+)"/g)) {
    const asset = path.join("_site", match[1]);
    if (!fs.existsSync(asset)) errors.push(`Missing asset on ${route}: ${match[1]}`);
  }
}

for (const route of Object.keys(expectedImageCounts).filter((route) => route.startsWith("work/") && route !== "work/index.html")) {
  const html = fs.readFileSync(path.join("_site", route), "utf8");
  if (!html.includes("data-carousel")) errors.push(`Missing carousel: ${route}`);
  if (!html.includes("portfolio-pagination")) errors.push(`Missing portfolio navigation: ${route}`);
}

const markdownPages = fs.readdirSync("src/pages").filter((file) => file.endsWith(".md"));
if (markdownPages.length < 11) errors.push(`Expected at least 11 Markdown files, found ${markdownPages.length}`);

if (errors.length) {
  console.error(errors.join("\n"));
  process.exit(1);
}
console.log(`Validated ${Object.keys(expectedImageCounts).length} content routes and ${markdownPages.length} Markdown source files.`);
