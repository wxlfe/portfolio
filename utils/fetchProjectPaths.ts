import { groq } from 'next-sanity';
import { sanityClient } from 'sanity';

const query = groq`
    *[_type == "project"]
`;

export const fetchProjectPaths = async () => {
  const res = await sanityClient.fetch(query);
  const paths = res.map((project) => {
    const id = project.slug.current;
    return `/my-work/${id}`;
  });

  return {
    paths,
    fallback: false,
  };
};
