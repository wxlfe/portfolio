import { Button, Card, Col, Grid, Link, Row, Text } from '@nextui-org/react';
import { Layout, ProjectCard } from 'components';
import { urlFor } from 'sanity';
import { fetchProjects } from 'utils';

const myWork = ({ projects }) => {
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
  const projects = await fetchProjects();
  return {
    props: {
      projects,
    },
  };
};
