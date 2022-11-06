export type CategorizedSkills = {
  [key: string]: Array<SkillType>;
};

export type Homepage = Array<HomepageSection>;

export type HomepageSection = {
  _createdAt: string;
  _id: string;
  _rev: string;
  _type: 'homepage';
  _updatedAt: string;
  mainImage: Image;
  subtitle: string;
  title: string;
};

export type Image = {
  _key?: string;
  _type: 'image';
  asset: {
    _ref: string;
    _type: 'reference';
  };
};

export type JobType = {
  _createdAt: string;
  _id: string;
  _rev: string;
  _type: 'job';
  _updatedAt: string;
  company: string;
  companyLogo: {
    _type: 'image';
    asset: {
      _ref: string;
      _type: string;
    };
  };
  description: Array<any>;
  endDate: string;
  projects: Array<any> | null;
  skills: Array<any> | null;
  startDate: string;
  title: string;
};

export type ProjectType = {
  _createdAt: string;
  _id: string;
  _rev: string;
  _type: 'project';
  _updatedAt: string;
  description: string;
  images: Array<Image>;
  job: JobType | null;
  link: string;
  skills: Array<Reference | SkillType | null>;
  slug: {
    _type: 'slug';
    current: string;
  };
  title: string;
  year: string;
};

export type Reference = {
  _key?: string;
  _ref: string;
  _type: 'reference';
};

export type SkillType = {
  _createdAt: string;
  _id: string;
  _rev: string;
  _type: 'skill';
  _updatedAt: string;
  category: string;
  description: string;
  experience: number;
  skillIcon: Image;
  slug: {
    _type: 'slug';
    current: string;
  };
  title: string;
  projects: Array<ProjectType>;
};
