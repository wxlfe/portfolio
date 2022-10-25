import { groq } from 'next-sanity';
import { sanityClient } from 'sanity';

export const fetchSkill = async (slug) => {
  const res = await sanityClient.fetch(groq`
        *[_type == "skill" && slug.current == "${slug}"]
    `);

  return res[0];
};
