import { Button, Card, Col, Grid, Link, Row, Text } from '@nextui-org/react';
import { Layout, ProjectCard } from 'components';
import { urlFor } from 'sanity';
import { fetchProjects } from 'utils';
import { ProjectType } from 'utils/types';

type Props = {
  projects: Array<ProjectType>;
};

const myWork = ({ projects }: Props) => {
  return (
    <Layout>
      <Text h1 css={{ textAlign: 'center' }}>
        My Work
      </Text>
      <Grid.Container gap={2} justify='center'>
        {projects.map((project) => {
          return (
            <Grid xs={12} sm={6} xl={4}>
              <ProjectCard project={project} />
            </Grid>
          );
        })}
      </Grid.Container>
    </Layout>
  );
};

export default myWork;

export const getStaticProps = async () => {
  const projects: Array<ProjectType> = await fetchProjects();
  return {
    props: {
      projects,
    },
  };
};
