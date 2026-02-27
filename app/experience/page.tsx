import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { getExperience, portableTextToHtml, sanityImageUrl } from '@/lib/sanity';

/**
 * Experience timeline route with job details and linked projects.
 */
export default async function ExperiencePage() {
  const data = await getExperience();

  return (
    <>
      <h1 className="page_header">Experience</h1>
      <div className="experience_list">
        {data.map((job, index) => (
          <div key={job._id} className="experience_item">
            <div className="experience_axis" aria-hidden="true">
              <span className="experience_point" />
            </div>
            <details className="experience_card" open={index === data.length - 1}>
              <summary className="experience_summary">
                <div className="experience_summary_main">
                  <h2 className="job_title">{job.title}</h2>
                  <p className="experience_summary_meta">{job.company}</p>
                </div>
                <p className="experience_summary_dates">{`${job.startDate} - ${job.endDate}`}</p>
              </summary>

              <div className="experience_body">
                <div className="project_skills">
                  {job.skills?.map((skill) => (
                    <Link key={skill._id} href={`/skills/${skill.slug.current}`}>
                      <Badge className="chip">
                        {skill.skillIcon ? <img src={sanityImageUrl(skill.skillIcon, 50)} alt={`${skill.title} Icon`} /> : null}
                        {skill.title}
                      </Badge>
                    </Link>
                  ))}
                </div>
                {job.description ? (
                  <div className="job_description" dangerouslySetInnerHTML={{ __html: portableTextToHtml(job.description) }} />
                ) : null}
                <div className="card_grid">
                  {job.projects?.map((project) => (
                    <Card key={project._id}>
                      <CardHeader>
                        <CardTitle>{project.title}</CardTitle>
                        <CardDescription>{project.year}</CardDescription>
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
              </div>
            </details>
          </div>
        ))}
      </div>
    </>
  );
}
