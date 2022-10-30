import { Collapse, Container, Image, Row, Text } from '@nextui-org/react';
import { Layout, ProjectCard, SkillPill } from 'components';
import { urlFor } from 'sanity';
import { fetchExperience } from 'utils/fetchExperience';

function sortByStartDate(a, b) {
  if (Number(a.startDate.slice(-2)) > Number(b.startDate.slice(-2))) {
    return -1;
  }
  if (Number(a.startDate.slice(-2)) < Number(b.startDate.slice(-2))) {
    return 1;
  }
  return 0;
}

const experience = ({ experience }) => {
  return (
    <Layout>
      <Collapse.Group
        bordered
        shadow
        css={{ margin: 'var(--nextui--navbarFloatingMargin)' }}
      >
        {experience.sort(sortByStartDate).map((job) => {
          return (
            <Collapse
              title={job.title}
              subtitle={`${job.company}, ${job.startDate} - ${job.endDate}`}
              contentLeft={
                <Image
                  src={urlFor(job.companyLogo).url()}
                  width='10vw'
                  css={{ maxWidth: '5rem' }}
                />
              }
            >
              <Text>{job.description[0].children[0].text}</Text>

              {!!job.skills && (
                <Container
                  css={{
                    maxWidth: '80rem',
                    display: 'flex',
                    justifyContent: 'center',
                    marginTop: '1rem',
                  }}
                >
                  <Row justify='center'>
                    <Text h4>Skills</Text>
                  </Row>
                  <div
                    style={{
                      display: 'flex',
                      overflowX: 'auto',
                      scrollbarWidth: 'none',
                      scrollbarColor: 'transparent',
                    }}
                  >
                    {job.skills?.map((skill) => {
                      return (
                        <div
                          style={{
                            margin: '1rem',
                          }}
                        >
                          <SkillPill skill={skill} />
                        </div>
                      );
                    })}
                  </div>
                </Container>
              )}

              {!!job.projects && (
                <Container
                  css={{
                    maxWidth: '80rem',
                    display: 'flex',
                    justifyContent: 'center',
                    marginTop: '1rem',
                  }}
                >
                  <Row justify='center'>
                    <Text h4>Projects</Text>
                  </Row>
                  <div
                    style={{
                      display: 'flex',
                      overflowX: 'auto',
                      scrollbarWidth: 'none',
                      scrollbarColor: 'transparent',
                    }}
                  >
                    {job.projects?.map((project) => {
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
                </Container>
              )}
            </Collapse>
          );
        })}
      </Collapse.Group>
    </Layout>
  );
};

export default experience;

export const getStaticProps = async () => {
  const experience = await fetchExperience();
  return {
    props: {
      experience,
    },
  };
};
