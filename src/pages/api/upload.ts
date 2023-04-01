// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import * as XLSX from 'xlsx';

type Data = {
  name: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method === 'POST') {
    const file = req.body;
    const workbook = XLSX.read(file);
    const ws = workbook.Sheets['Sheet1'];
    const json = XLSX.utils.sheet_to_json(ws);
    console.log(json);
  }
  res.status(200).json({ name: 'hello file uploader' });
}
