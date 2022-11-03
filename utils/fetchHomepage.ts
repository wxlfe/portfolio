import { groq } from 'next-sanity';
import { sanityClient } from 'sanity';

const query = groq`
    *[_type == "homepage"]
`;

export const fetchHomepage = async () => {
  const res = await sanityClient.fetch(query);
  return res;
};
