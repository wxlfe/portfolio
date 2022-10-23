import { Grid, Image, Spacer, Text } from '@nextui-org/react';
import { Layout } from 'components';
import { urlFor } from 'sanity';
import { fetchHomepage } from 'utils/fetchHomepage';

const Index = ({ homepage }) => {
  return (
    <Layout>
      {homepage.map((section, index) => {
        if (index % 2 === 0) {
          return (
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
              }}
            >
              <Grid.Container justify='center'>
                <Grid xs={12} md={6} css={{ padding: '1.1rem' }}>
                  <Image
                    src={urlFor(section?.mainImage).url()}
                    objectFit='scale-down'
                    alt='Default Image'
                    css={{
                      borderRadius: '50% 25%',
                    }}
                  />
                </Grid>
                <Grid xs={12} md={6} css={{ padding: '1.1rem' }}>
                  <div
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'center',
                    }}
                  >
                    <Text h1>{section.title}</Text>
                    <Text h2>{section.subtitle}</Text>
                  </div>
                </Grid>
              </Grid.Container>
            </div>
          );
        }
      })}
    </Layout>
  );
};

export default Index;

export const getStaticProps = async () => {
  const homepage = await fetchHomepage();
  return {
    props: {
      homepage,
    },
  };
};
