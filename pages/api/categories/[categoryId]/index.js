import fs from "fs";
import path from "path";

export default async function handler(req, res) {
  const dirPath = path.join(process.cwd(), "articles");
  const dirs = fs.readdirSync(dirPath);
  const { categoryId } = req.query;

  if (!dirs.includes(categoryId)) {
    return res.status(404).json({ message: "No articles found" });
  }

  const files = fs.readdirSync(
    path.join(dirPath, categoryId),
  )

  if (!files.length) {
    return res.status(404).json({ message: "No articles found" });
  }

  return res.status(200).json(files);
}       
