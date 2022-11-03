import { Button, Card, Col, Link, Row, Text } from '@nextui-org/react';
import { urlFor } from 'sanity';

const ProjectCard = ({ project }) => {
  return (
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
                    ? `${project.year} at ${project.job.company}`
                    : `${project.year}`}
                </Text>
              </Col>
            </Row>
          </Col>
          <Col>
            <Row
              justify='flex-end'
              css={{
                marginTop: '2%',
              }}
            >
              <Link href={`/my-work/${project.slug.current}`}>
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
              </Link>
            </Row>
          </Col>
        </Row>
      </Card.Footer>
    </Card>
  );
};

export default ProjectCard;
