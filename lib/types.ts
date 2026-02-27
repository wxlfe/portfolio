import type { PortableTextBlock } from '@portabletext/types';

/**
 * Sanity slug field shape used for route generation.
 */
export type Slug = {
  current: string;
};

/**
 * Minimal Sanity image reference shape.
 */
export type SanityImage = {
  _type?: string;
  asset?: {
    _ref?: string;
    _type?: string;
  };
};

/**
 * CMS homepage content model.
 */
export type Homepage = {
  title: string;
  subtitle: string;
  mainImage?: SanityImage;
};

/**
 * CMS skill model with related media and project references.
 */
export type Skill = {
  _id: string;
  title: string;
  slug: Slug;
  description?: string;
  category?: string;
  experience?: string;
  skillIcon?: SanityImage;
  images?: SanityImage[];
  projects?: Project[];
};

/**
 * CMS job/experience model.
 */
export type Job = {
  _id: string;
  title: string;
  company: string;
  startDate: string;
  endDate: string;
  description?: PortableTextBlock[];
  skills: Skill[];
  projects: Project[];
};

/**
 * CMS project model with linked skills and job metadata.
 */
export type Project = {
  _id: string;
  title: string;
  year: string;
  slug: Slug;
  description?: string;
  link?: string;
  images?: SanityImage[];
  skills?: Skill[];
  job?: Job;
};
