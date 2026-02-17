'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { sanityImageUrl } from '@/lib/sanity';
import type { Project } from '@/lib/types';

type Props = {
  projects: Project[];
};

function compareYear(a: Project, b: Project): number {
  const aYear = Number.parseInt(a.year, 10);
  const bYear = Number.parseInt(b.year, 10);
  if (aYear > bYear) return -1;
  if (aYear < bYear) return 1;
  return 0;
}

function compareName(a: Project, b: Project): number {
  if (a.title < b.title) return -1;
  if (a.title > b.title) return 1;
  return 0;
}

export function ProjectsList({ projects }: Props) {
  const [sortBy, setSortBy] = useState('Year');

  const sortedProjects = useMemo(() => {
    const clone = [...projects];
    if (sortBy === 'Name') {
      return clone.sort(compareName);
    }
    return clone.sort(compareYear);
  }, [projects, sortBy]);

  return (
    <>
      <div className="filter_row">
        <label htmlFor="project-sort" className="select-label">
          Sort By
        </label>
        <select id="project-sort" value={sortBy} onChange={(event) => setSortBy(event.target.value)} className="ui-input">
          <option value="Year">Year</option>
          <option value="Name">Name</option>
        </select>
      </div>
      <div className="card_grid">
        {sortedProjects.map((project) => (
          <Card key={project._id}>
            <CardHeader>
              <CardTitle>{project.title}</CardTitle>
              <CardDescription>{project.job ? `${project.year} at ${project.job.company}` : project.year}</CardDescription>
            </CardHeader>
            {project.images?.length ? (
              <img className="project_image" src={sanityImageUrl(project.images[0], 1920)} alt={project.title} />
            ) : null}
            <CardFooter>
              <Button asChild>
                <Link href={`/projects/${project.slug.current}`}>SEE MORE</Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </>
  );
}
