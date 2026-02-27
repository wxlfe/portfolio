import type { MetadataRoute } from 'next';
import { getProjects, getSkills } from '@/lib/sanity';

/**
 * Canonical production origin used for sitemap URLs.
 */
const BASE_URL = 'https://wxlfe.dev';

/**
 * Generates sitemap entries for static routes and CMS-backed dynamic routes.
 */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: `${BASE_URL}/`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${BASE_URL}/projects`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/skills`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/experience`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
  ];

  try {
    const [projects, skills] = await Promise.all([getProjects(), getSkills()]);

    const projectRoutes: MetadataRoute.Sitemap = projects
      .map((project) => project.slug?.current)
      .filter(Boolean)
      .map((slug) => ({
        url: `${BASE_URL}/projects/${slug}`,
        lastModified: now,
        changeFrequency: 'monthly' as const,
        priority: 0.7,
      }));

    const skillRoutes: MetadataRoute.Sitemap = skills
      .map((skill) => skill.slug?.current)
      .filter(Boolean)
      .map((slug) => ({
        url: `${BASE_URL}/skills/${slug}`,
        lastModified: now,
        changeFrequency: 'monthly' as const,
        priority: 0.7,
      }));

    return [...staticRoutes, ...projectRoutes, ...skillRoutes];
  } catch {
    return staticRoutes;
  }
}
