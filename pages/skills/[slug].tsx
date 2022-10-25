import { Container, Image, Row, Text } from '@nextui-org/react';
import { Layout } from 'components';
import { urlFor } from 'sanity';
import { fetchSkill, fetchSkillPaths } from 'utils';

export default function Skill({ skill }) {
  return (
    <Layout>
      <Container fluid>
        <Row justify='center' align='center'>
          <Image
            src={urlFor(skill.skillIcon).url()}
            height='10rem'
            width='10rem'
            containerCss={{
              margin: '1rem',
            }}
          />
          <Text h1>{skill.title}</Text>
        </Row>
      </Container>
      <Container
        css={{
          maxWidth: '70rem',
        }}
      >
        <Row justify='center' align='center'>
          <Text>{skill.description}</Text>
        </Row>
      </Container>
    </Layout>
  );
}

export const getStaticPaths = async () => {
  const paths = await fetchSkillPaths();
  return paths;
};

export const getStaticProps = async (context) => {
  const id = context.params.slug;
  const skill = await fetchSkill(id);
  return {
    props: {
      skill,
    },
  };
};
