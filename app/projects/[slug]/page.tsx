import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowUpRight } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { ProjectImageCarousel } from '@/components/project-image-carousel';
import { getProject, sanityImageUrl } from '@/lib/sanity';

type Props = {
  params: Promise<{ slug: string }>;
};

/**
 * Dynamic project detail route.
 */
export default async function ProjectPage({ params }: Props) {
  const { slug } = await params;
  const data = await getProject(slug);

  if (!data) {
    notFound();
  }

  return (
    <>
      <Card className="project_page_card">
        <div className="project_page_layout">
          {data.images?.length ? (
            <div className="project_media_col">
              <ProjectImageCarousel images={data.images.map((image) => sanityImageUrl(image, 1920))} title={data.title} />
            </div>
          ) : null}

          <div className="project_content_col">
            <div className="project_header">
              <h1 className="page_header">{data.title}</h1>
              {data.link ? (
                <a href={data.link} className="external_link" aria-label="Open project link">
                  <ArrowUpRight />
                </a>
              ) : null}
            </div>
            <h2 className="project_meta_line">{data.job?.company ? `${data.year} at ${data.job.company}` : data.year}</h2>
            <div className="project_description">{data.description}</div>
            <div className="project_skills">
              {data.skills?.map((skill) => (
                <Link key={skill._id} href={`/skills/${skill.slug.current}`}>
                  <Badge className="chip">
                    {skill.skillIcon ? <img src={sanityImageUrl(skill.skillIcon, 50)} alt={`${skill.title} Icon`} /> : null}
                    {skill.title}
                  </Badge>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </Card>
    </>
  );
}
