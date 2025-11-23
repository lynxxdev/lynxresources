import fs from "fs";
import path from "path";

let execCounts = {};

export default function handler(req, res) {
  const file = req.query.file;
  if (!file) return res.status(400).send("Defina ?file=");

  const filePath = path.join(process.cwd(), "public", "scripts", file);

  if (!fs.existsSync(filePath)) return res.status(404).send("Arquivo não encontrado");

  execCounts[file] = (execCounts[file] || 0) + 1;

  res.setHeader("Content-Type", "text/plain");
  res.send(fs.readFileSync(filePath, "utf-8"));
}