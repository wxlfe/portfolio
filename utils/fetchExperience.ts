import { groq } from 'next-sanity';
import { sanityClient } from 'sanity';

const query = groq`
    *[_type == "job"]
`;

export const fetchExperience = async () => {
  const res = await sanityClient.fetch(query);
  return res;
};
