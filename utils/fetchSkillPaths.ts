import { groq } from 'next-sanity';
import { sanityClient } from 'sanity';

const query = groq`
    *[_type == "skill"]
`;

export const fetchSkillPaths = async () => {
  const res = await sanityClient.fetch(query);
  const paths = res.map((skill) => {
    const id = skill.slug.current;
    return `/skills/${id}`;
  });

  return {
    paths,
    fallback: false,
  };
};
