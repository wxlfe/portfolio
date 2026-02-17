import { getProjects } from '@/lib/sanity';
import { ProjectsList } from '@/components/projects-list';

export default async function ProjectsPage() {
  const projects = await getProjects();

  return (
    <>
      <h1 className="page_header">Projects</h1>
      <ProjectsList projects={projects} />
    </>
  );
}
