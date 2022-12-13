import { Card, Container, Image, Row, Text } from '@nextui-org/react';
import { Layout, ProjectCard } from 'components';
import Head from 'next/head';
import { urlFor } from 'sanity';
import { fetchSkill, fetchSkillPaths } from 'utils';
import { SkillType } from 'utils/types';

type Props = {
  skill: SkillType;
};

export default function Skill({ skill }: Props) {
  return (
    <>
      <Head>
        <title>Nate Wolfe | Skills | {skill?.title}</title>
        <meta name='description' content={`Skills - ${skill?.title}`} />
      </Head>
      <Layout>
        <Row
          justify='center'
          css={{
            margin: '1rem',
          }}
        >
          <Card css={{ maxWidth: '80rem' }}>
            <Card.Header>
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
            </Card.Header>
            <Card.Body>
              <Container
                css={{
                  display: 'flex',
                  justifyContent: 'center',
                }}
              >
                <Row justify='center' align='center'>
                  <Text>{skill.description}</Text>
                </Row>
                {!!skill.projects[0] && (
                  <>
                    <Text h2>Projects Using {skill.title}</Text>
                    <div
                      style={{
                        display: 'flex',
                        overflowX: 'auto',
                        scrollbarWidth: 'none',
                        scrollbarColor: 'transparent',
                      }}
                    >
                      {skill.projects.map((project) => {
                        return (
                          <div
                            style={{
                              margin: '1rem',
                              minWidth: '22rem',
                              maxWidth: '22rem',
                            }}
                          >
                            <ProjectCard project={project} />
                          </div>
                        );
                      })}
                    </div>
                  </>
                )}
              </Container>
            </Card.Body>
          </Card>
        </Row>
      </Layout>
    </>
  );
}

export const getStaticPaths = async () => {
  const paths = await fetchSkillPaths();
  return paths;
};

export const getStaticProps = async (context) => {
  const id = context.params.slug;
  const skill: SkillType = await fetchSkill(id);
  return {
    props: {
      skill,
    },
  };
};
