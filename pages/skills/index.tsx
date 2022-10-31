import { Button, Grid, Image, Link, Text } from '@nextui-org/react';
import { Layout } from 'components';
import { urlFor } from 'sanity';
import { fetchSkills } from 'utils';

function sortByExperience(a, b) {
  if (a.experience > b.experience) {
    return -1;
  }
  if (b.experience > a.experience) {
    return 1;
  }
  return 0;
}

const skills = ({ skills }) => {
  return (
    <Layout>
      <Text h1 css={{ textAlign: 'center' }}>
        Skills
      </Text>
      {skills.sort(sortByExperience).map((skill, index) => {
        return (
          <Link href={`/skills/${skill.slug.current}`}>
            <Button
              color='primary'
              auto
              rounded
              ghost
              icon={
                <Image
                  src={urlFor(skill.skillIcon).url()}
                  css={{
                    objectFit: 'scale-down',
                    maxHeight: '2rem',
                    maxWidth: '2rem',
                  }}
                />
              }
              href={`/skills/${skill.slug.current}`}
            >
              <Text b>{skill.title}</Text>
            </Button>
          </Link>
        );
      })}
    </Layout>
  );
};

export default skills;

export const getStaticProps = async () => {
  const skills = await fetchSkills();
  return {
    props: {
      skills,
    },
  };
};
