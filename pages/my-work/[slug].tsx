import {
  Card,
  Container,
  Image,
  Modal,
  Row,
  Spacer,
  Text,
} from '@nextui-org/react';
import { Layout, SkillPill } from 'components';
import { useState } from 'react';
import { urlFor } from 'sanity';
import { fetchProject, fetchProjectPaths } from 'utils';
import { ProjectType } from 'utils/types';

type Props = {
  project: ProjectType;
};

export default function Project({ project }: Props) {
  const [visible, setVisible] = useState(
    project.images.map((image) => {
      return false;
    })
  );
  const handler = (providedIndex) => {
    const arr = visible.map((el, index) => {
      if (index === providedIndex) {
        return true;
      } else {
        return false;
      }
    });
    setVisible(arr);
  };
  const closeHandler = (index) => {
    const arr = visible.map((el) => false);
    setVisible(arr);
  };

  return (
    <Layout>
      <Text h1 css={{ textAlign: 'center', marginTop: '1rem' }}>
        {project.title}
      </Text>
      {!!project.job ? (
        <Text h2 css={{ textAlign: 'center', marginTop: '1rem' }}>
          {project.year} at {project.job.company}
        </Text>
      ) : (
        <Text h2 css={{ textAlign: 'center', marginTop: '1rem' }}>
          {project.year}
        </Text>
      )}
      <Container
        css={{
          maxWidth: '80rem',
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <div
          style={{
            display: 'flex',
            overflowX: 'auto',
            scrollbarWidth: 'none',
            scrollbarColor: 'transparent',
          }}
        >
          {project.images.map((image, index) => {
            return (
              <>
                <Card
                  isPressable
                  onPress={() => {
                    handler(index);
                  }}
                  css={{
                    margin: '1rem',
                    minWidth: '22rem',
                    maxWidth: '22rem',
                  }}
                >
                  <Card.Image src={urlFor(image).url()} />
                </Card>
                <Modal
                  blur
                  noPadding
                  open={visible[index]}
                  onClose={() => {
                    closeHandler(index);
                  }}
                  width='max-content'
                  css={{
                    maxWidth: '90vw',
                  }}
                >
                  <Modal.Body>
                    <Image showSkeleton src={urlFor(image).url()} />
                  </Modal.Body>
                </Modal>
              </>
            );
          })}
        </div>
        <div
          style={{
            display: 'flex',
            overflowX: 'auto',
            scrollbarWidth: 'none',
            scrollbarColor: 'transparent',
          }}
        >
          {project.skills.map((skill) => {
            return <SkillPill skill={skill} />;
          })}
        </div>
        <Spacer />
        <Row justify='center' align='center'>
          <Text>{project.description}</Text>
        </Row>
      </Container>
    </Layout>
  );
}

export const getStaticPaths = async () => {
  const paths = await fetchProjectPaths();
  return paths;
};

export const getStaticProps = async (context) => {
  const id = context.params.slug;
  const project: ProjectType = await fetchProject(id);
  return {
    props: {
      project,
    },
  };
};
