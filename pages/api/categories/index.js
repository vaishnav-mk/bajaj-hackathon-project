import fs from "fs";
import path from "path";

export default async function handler(req, res) {
  const dirPath = path.join(process.cwd(), "articles");
  const dirs = fs.readdirSync(dirPath);

  const directories = [];

  for (const dir of dirs) {
    const files = fs.readdirSync(path.join(dirPath, dir));
    directories.push({
      id: dir,
      articlesLength: files.length,
    });
  }

  if (!directories.length) {
    return res.status(404).json({ message: "No articles found" });
  }

  return res.status(200).json(directories);
}
