import fs from "fs";
import path from "path";

export default async function handler(req, res) {
  const { categoryId } = req.query;
  const dirPath = path.join(process.cwd(), "articles", categoryId);

  const files = fs.readdirSync(dirPath);

  if (!files.length) {
    return res.status(404).json({ message: "No articles found" });
  }

  const faqs = [];

  for (const file of files) {
    const currentPath = path.join(dirPath, file);
    const currentFile = fs.readFileSync(currentPath, "utf8");
    const currentFileJson = JSON.parse(currentFile);
    const { faq, slug } = currentFileJson;
    faq.forEach((item) => {
      faqs.push({faq: item, slug});
    });
  }

  if (!faqs.length) {
    return res.status(404).json({ message: "No articles found" });
  }

  return res.status(200).json(faqs.flat());
}
