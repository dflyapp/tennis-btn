import type { NextApiRequest, NextApiResponse } from "next";
import xlsx from "node-xlsx";

import path from "path";
import fs from "fs";

type Data = {
  name: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const xlsxDirectory = path.join(process.cwd(), "pages/api/score");
  const fileContents = await fs.readFileSync(xlsxDirectory + "/data.xlsx");

  const data = xlsx.parse(fileContents);
  console.log(data[0].data[0]);
  res.status(200).json(data);
}
