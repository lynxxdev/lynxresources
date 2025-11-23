import fs from 'fs';
import path from 'path';

export const config = {
  api: {
    bodyParser: false
  }
};

export default async function handler(req, res) {
  if (req.method !== "POST")
    return res.status(405).send("Método inválido");

  const chunks = [];
  for await (const chunk of req) chunks.push(chunk);
  const body = Buffer.concat(chunks);

  const fileName = req.headers["x-file-name"];
  if (!fileName) return res.status(400).send("Arquivo sem nome");

  const folder = path.join(process.cwd(), "public", "scripts");

  if (!fs.existsSync(folder)) fs.mkdirSync(folder, { recursive: true });

  const filePath = path.join(folder, fileName);

  fs.writeFileSync(filePath, body);

  res.status(200).json({ ok: true, file: fileName });
}