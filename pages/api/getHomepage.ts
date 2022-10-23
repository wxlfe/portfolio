import type { NextApiRequest, NextApiResponse } from 'next';
import { groq } from 'next-sanity';
import { sanityClient } from 'sanity';

const query = groq`
    *[_type == "homepage"]
`;

export default async function handler(req, res) {
  const homepage = await sanityClient.fetch(query);
  res.status(200).json({ homepage });
}
