export type Slug = {
  current: string;
};

export type SanityImage = {
  _type?: string;
  asset?: {
    _ref?: string;
    _type?: string;
  };
};

export type Homepage = {
  title: string;
  subtitle: string;
  mainImage?: SanityImage;
};

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

export type Job = {
  _id: string;
  title: string;
  company: string;
  startDate: string;
  endDate: string;
  description?: unknown[];
  skills: Skill[];
  projects: Project[];
};

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
