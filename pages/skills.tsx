import { Button, Grid, Image, Text } from '@nextui-org/react';
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
        {skills.map((skill) => {
          return (
            <Grid xs={12} sm={4} md={3} lg={2} justify='center'>
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
              >
                <Text b>{skill.title}</Text>
              </Button>
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
