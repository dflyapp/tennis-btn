import type { NextApiRequest, NextApiResponse } from "next";
import xlsx from "node-xlsx";

import path from "path";
import fs from "fs";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  const xlsxDirectory = path.join(process.cwd(), "pages/api/score");
  const fileContents = await fs.readFileSync(xlsxDirectory + "/data.xlsx");
  const data = xlsx.parse(fileContents);

  res.status(200).json(data);
}
