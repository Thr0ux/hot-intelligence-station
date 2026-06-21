import fs from "node:fs/promises";
import path from "node:path";

const rootDir = path.resolve(new URL("..", import.meta.url).pathname);
const distDir = path.join(rootDir, "dist");

const files = ["index.html", "app.js", "styles.css"];
const directories = ["assets"];

await fs.rm(distDir, { recursive: true, force: true });
await fs.mkdir(path.join(distDir, "data"), { recursive: true });

for (const file of files) {
  await fs.copyFile(path.join(rootDir, file), path.join(distDir, file));
}

for (const directory of directories) {
  await fs.cp(path.join(rootDir, directory), path.join(distDir, directory), {
    recursive: true
  });
}

await fs.copyFile(
  path.join(rootDir, "data", "generated-data.js"),
  path.join(distDir, "data", "generated-data.js")
);

console.log(`Prepared static site in ${distDir}`);
