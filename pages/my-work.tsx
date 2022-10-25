import { Button, Card, Col, Grid, Row, Text } from '@nextui-org/react';
import { Layout } from 'components';
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
              <Card css={{ w: '100%', h: 'auto' }}>
                <Card.Body css={{ p: 0 }}>
                  <Card.Image
                    src={urlFor(project.images[0]).url()}
                    objectFit='cover'
                    width='100%'
                    height='100%'
                    alt={`Card Image for ${project.title}`}
                  />
                </Card.Body>
                <Card.Footer
                  isBlurred
                  css={{
                    position: 'absolute',
                    bgBlur: '#0f111466',
                    borderTop: '$borderWeights$light solid $gray800',
                    bottom: 0,
                    zIndex: 1,
                  }}
                >
                  <Row>
                    <Col>
                      <Row>
                        <Col>
                          <Text b color='white' size={20}>
                            {project.title}
                          </Text>
                          <Text color='#f8f8f8' size={12}>
                            {!!project.job
                              ? `${project.year} at a job`
                              : `${project.year}`}
                          </Text>
                        </Col>
                      </Row>
                    </Col>
                    <Col>
                      <Row justify='flex-end'>
                        <Button
                          flat
                          auto
                          rounded
                          css={{ color: 'white', bg: '#d1ad54aa' }}
                        >
                          <Text
                            css={{ color: 'inherit' }}
                            size={12}
                            weight='bold'
                            transform='uppercase'
                          >
                            See More
                          </Text>
                        </Button>
                      </Row>
                    </Col>
                  </Row>
                </Card.Footer>
              </Card>
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
