import { createClient } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';
import { toHTML, type PortableTextComponents } from '@portabletext/to-html';
import type { PortableTextBlock } from '@portabletext/types';
import type { Homepage, Job, Project, SanityImage, Skill } from './types';

/**
 * Sanity project identifier used by the client.
 */
const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? '83vjz0lc';
/**
 * Sanity dataset name used by the client.
 */
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET ?? 'production';
/**
 * Sanity API version pinned for query stability.
 */
const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION ?? '2021-10-21';

const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: true,
});

/**
 * URL builder for generating transformed Sanity asset URLs.
 */
const builder = imageUrlBuilder(client);

/**
 * Builds a Sanity image URL with optional width and auto-formatting.
 */
export function sanityImageUrl(source: SanityImage | undefined, width?: number): string {
  if (!source) {
    return '';
  }

  const imageBuilder = builder.image(source).auto('format');
  return width ? imageBuilder.width(width).url() : imageBuilder.url();
}

/**
 * Fetches the single homepage document.
 */
export async function getHomepage(): Promise<Homepage | null> {
  const data = await client.fetch<Homepage[]>('*[_type == "homepage"]');
  return data[0] ?? null;
}

/**
 * Fetches all projects and expands their related job reference.
 */
export async function getProjects(): Promise<Project[]> {
  return client.fetch<Project[]>(`*[_type == "project"]{
    ...,
    job->
  }`);
}

/**
 * Fetches a single project by slug with linked skills and job data.
 */
export async function getProject(slug: string): Promise<Project | null> {
  const data = await client.fetch<Project[]>(
    `*[_type == "project" && slug.current == $slug]{
      ...,
      "skills": skills[]->,
      "job": job->
    }`,
    { slug }
  );
  return data[0] ?? null;
}

/**
 * Fetches all skill documents.
 */
export async function getSkills(): Promise<Skill[]> {
  return client.fetch<Skill[]>('*[_type == "skill"]');
}

/**
 * Fetches a single skill by slug and all projects that reference it.
 */
export async function getSkill(slug: string): Promise<Skill | null> {
  const data = await client.fetch<Skill[]>(
    `*[_type == "skill" && slug.current == $slug]{
      ...,
      "projects": *[_type=="project" && references(^._id)]{
        ...,
        job->
      }
    }`,
    { slug }
  );
  return data[0] ?? null;
}

/**
 * Fetches all job experience documents with populated skills and projects.
 */
export async function getExperience(): Promise<Job[]> {
  return client.fetch<Job[]>(`*[_type == "job"]{
    ...,
    "skills": skills[]->,
    "projects": projects[]->
  }`);
}

/**
 * Portable Text render mapping used by HTML serialization.
 */
const portableTextComponents: PortableTextComponents = {
  types: {
    image: ({ value }) => {
      const image = sanityImageUrl(value as SanityImage, 900);
      return image ? `<img src="${image}" alt="" />` : '';
    },
  },
};

/**
 * Renders Portable Text blocks into sanitized HTML fragments.
 */
export function portableTextToHtml(value: PortableTextBlock[] | undefined): string {
  if (!value) {
    return '';
  }

  return toHTML(value, { components: portableTextComponents });
}
