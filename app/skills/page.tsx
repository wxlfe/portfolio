import Link from 'next/link';
import { ArrowRightCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { getSkills, sanityImageUrl } from '@/lib/sanity';
import type { Skill } from '@/lib/types';

/**
 * Sort comparator for highest-to-lowest skill experience ordering.
 */
function compareExperience(a: Skill, b: Skill): number {
  const aExp = Number.parseInt(a.experience ?? '0', 10);
  const bExp = Number.parseInt(b.experience ?? '0', 10);
  if (aExp > bExp) return -1;
  if (aExp < bExp) return 1;
  return 0;
}

/**
 * Groups skills by category after applying the default experience sort.
 */
function groupSkills(skills: Skill[]): Record<string, Skill[]> {
  const grouped: Record<string, Skill[]> = {};
  const sorted = [...skills].sort(compareExperience);

  for (const skill of sorted) {
    const key = skill.category ?? 'Other';
    grouped[key] = grouped[key] ? [...grouped[key], skill] : [skill];
  }

  return grouped;
}

/**
 * Skills listing route grouped by category.
 */
export default async function SkillsPage() {
  const skills = await getSkills();
  const grouped = groupSkills(skills);
  const categories = Object.keys(grouped);

  return (
    <>
      <h1 className="page_header">Skills</h1>
      <div className="page_container">
        <div className="categories_container">
          {categories.map((category) => (
            <Card key={category} className="category">
              <CardHeader className="category_title">
                <CardTitle>{category}</CardTitle>
              </CardHeader>
              <CardContent className="skills_container">
                {grouped[category].map((skill) => (
                  <div key={skill._id} className="skill">
                    <Link href={`/skills/${skill.slug.current}`} className="skill_row_link" aria-label={`View ${skill.title}`}>
                      <div className="skill_label">
                        <div className="skill_img_container">
                          {skill.skillIcon ? <img src={sanityImageUrl(skill.skillIcon, 50)} alt={`${skill.title} Icon`} /> : null}
                        </div>
                        <div className="skill_title_container">
                          <h3 className="skill_title">{skill.title}</h3>
                        </div>
                        <span className="skill_link">
                          <ArrowRightCircle />
                        </span>
                      </div>
                      <Progress value={Number(skill.experience ?? 0) * 10} />
                    </Link>
                  </div>
                ))}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </>
  );
}
