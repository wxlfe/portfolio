import { groq } from 'next-sanity';
import { sanityClient } from 'sanity';

export const fetchProject = async (slug) => {
  const res = await sanityClient.fetch(groq`
        *[_type == "project" && slug.current == "${slug}"]{
          ...,
          "skills": skills[]->,
          "job": job->
        }
    `);

  return res[0];
};
