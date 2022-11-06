import {
  Button,
  Container,
  Grid,
  Image,
  Link,
  Progress,
  Text,
} from '@nextui-org/react';
import { Layout } from 'components';
import { urlFor } from 'sanity';
import { fetchSkills } from 'utils';
import { CategorizedSkills, SkillType } from 'utils/types';

type Props = {
  skills: Array<SkillType>;
};

function sortByExperience(a, b) {
  if (a.experience > b.experience) {
    return -1;
  }
  if (b.experience > a.experience) {
    return 1;
  }
  return 0;
}

function groupBy(objectArray, property) {
  return objectArray.reduce((acc, obj) => {
    const key = obj[property];
    const curGroup = acc[key] ?? [];

    return { ...acc, [key]: [...curGroup, obj] };
  }, {});
}

const skills = ({ skills }: Props) => {
  const categorizedSkills: CategorizedSkills = groupBy(skills, 'category');
  return (
    <Layout>
      <Text h1 css={{ textAlign: 'center' }}>
        Skills
      </Text>
      {Object.entries(categorizedSkills).map((category, index) => {
        return (
          <Container
            css={{
              maxWidth: '80rem',
              display: 'flex',
              justifyContent: 'center',
              marginTop: '1rem',
            }}
            key={index}
          >
            <Text h2 css={{ textAlign: 'center' }}>
              {category[0]}
            </Text>
            <Grid.Container gap={1} justify='center'>
              {category[1].sort(sortByExperience).map((skill, index) => {
                return (
                  <>
                    <Grid
                      xs={5}
                      justify='center'
                      alignItems='center'
                      key={`Button ${index}`}
                    >
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
                    <Grid
                      xs={5}
                      justify='center'
                      alignItems='center'
                      key={`Progress ${index}`}
                    >
                      <Progress value={skill.experience * 10} />
                    </Grid>
                  </>
                );
              })}
            </Grid.Container>
          </Container>
        );
      })}
    </Layout>
  );
};

export default skills;

export const getStaticProps = async () => {
  const skills: Array<SkillType> = await fetchSkills();
  return {
    props: {
      skills,
    },
  };
};
