const fs = require("fs");
const path = require("path");

// Define the source and destination directories
const sourceDir = "./posts_old";
const destDir = "./posts";

// Get the list of markdown files in the source directory
const markdownFiles = fs
  .readdirSync(sourceDir)
  .filter((f) => f.endsWith(".md"));

// For each markdown file...
markdownFiles.forEach((mdFile) => {
  // Create a new directory in the destination directory with the same name as the markdown file (minus the .md)
  const newDirPath = path.join(destDir, path.parse(mdFile).name);
  if (!fs.existsSync(newDirPath)) {
    fs.mkdirSync(newDirPath, { recursive: true });
  }

  // Copy the markdown file to the new directory, renaming it to index.md
  fs.copyFileSync(
    path.join(sourceDir, mdFile),
    path.join(newDirPath, "index.md"),
  );
});
