import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { getSkill, sanityImageUrl } from '@/lib/sanity';

type Props = {
  params: Promise<{ slug: string }>;
};

export default async function SkillPage({ params }: Props) {
  const { slug } = await params;
  const data = await getSkill(slug);

  if (!data) {
    notFound();
  }

  return (
    <>
      <Card className="skill_intro_card">
        <CardHeader>
          <div className="skill_header">
            {data.skillIcon ? <img src={sanityImageUrl(data.skillIcon, 100)} alt={`${data.title} icon`} /> : null}
            <CardTitle>{data.title}</CardTitle>
          </div>
        </CardHeader>
        <div className="skill_description">{data.description}</div>
      </Card>
      {data.images?.length ? (
        <div className="skill_images">
          {data.images.map((image, index) => (
            <img key={`${data._id}-${index}`} src={sanityImageUrl(image, 1920)} alt={data.title} />
          ))}
        </div>
      ) : null}
      {data.projects?.length ? (
        <div className="skill_projects">
          <h2>Projects Using {data.title}</h2>
          <div className="card_grid">
            {data.projects.map((project) => (
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
      ) : null}
    </>
  );
}
