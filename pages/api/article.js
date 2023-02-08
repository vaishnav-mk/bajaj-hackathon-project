import fs from "fs";
import path from "path";
export default function handler(req, res) {
  const { categoryId, articleSlug } = req.query;
  const dirPath = path.join(process.cwd(), "articles");
  const dirs = fs.readdirSync(dirPath);

  if (!dirs.includes(categoryId)) {
    return res.status(404).json({ message: "No articles found" });
  }

  const files = fs.readdirSync(path.join(dirPath, categoryId));
  if (!files.length) {
    return res.status(404).json({ message: "No articles found" });
  }

  let file;

  try {
    file = require(`../../articles/${categoryId}/${articleSlug}.json`);
  } catch (error) {
    console.log(error);
    return res.status(404).json({ message: "No articles found" });
  }

  return res.status(200).json(file);
}
