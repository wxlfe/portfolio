import { Collapse, Image, Text } from '@nextui-org/react';
import { Layout } from 'components';
import { urlFor } from 'sanity';
import { fetchExperience } from 'utils/fetchExperience';

const experience = ({ experience }) => {
  console.log(experience);

  return (
    <Layout>
      <Collapse.Group
        bordered
        shadow
        css={{ margin: 'var(--nextui--navbarFloatingMargin)' }}
      >
        {experience.map((job) => {
          return (
            <Collapse
              title={job.title}
              subtitle={`${job.company}, ${job.startDate} - ${job.endDate}`}
              contentLeft={
                <Image src={urlFor(job.companyLogo).url()} width='10vw' />
              }
            >
              <Text>{job.description[0].children[0].text}</Text>
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
