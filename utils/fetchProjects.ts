import { groq } from 'next-sanity';
import { sanityClient } from 'sanity';

const query = groq`
    *[_type == "project"]
`;

export const fetchProjects = async () => {
  const res = await sanityClient.fetch(query);
  return res;
};
