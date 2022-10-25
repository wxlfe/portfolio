import { Button, Grid, Image, Link, Text } from '@nextui-org/react';
import { Layout } from 'components';
import { urlFor } from 'sanity';
import { fetchSkills } from 'utils';

const skills = ({ skills }) => {
  return (
    <Layout>
      <Text h1 css={{ textAlign: 'center' }}>
        Skills
      </Text>
      <Grid.Container gap={1} justify='center'>
        {skills.map((skill, index) => {
          return (
            <Grid xs={6} sm={4} justify='center' key={index}>
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
            </Grid>
          );
        })}
      </Grid.Container>
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
