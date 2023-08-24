// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
import fetch from 'node-fetch';

interface Data {
  name: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>,
) {
  // access the request body

  const { url } = req.query;

  const response = await fetch(url as string);
  const mimeType = response.headers.get('Content-Type');
  const imageBuffer: any = await response.buffer();
  res.setHeader('Content-Type', mimeType as string);
  res.send(imageBuffer);
}
