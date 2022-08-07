import type { NextApiRequest, NextApiResponse } from "next";
import xlsx from "node-xlsx";

import fs from "fs";
import path from "path";
import getConfig from "next/config";
const { serverRuntimeConfig } = getConfig();

type Data = {
  name: string;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const data = xlsx.parse(
    fs.readFileSync(
      path.join(serverRuntimeConfig.PROJECT_ROOT, "pages/api/score/data.xlsx")
    )
  );
  console.log(data[0].data[0]);
  res.status(200).json({ name: JSON.stringify(data[0].data[0]) });
}
