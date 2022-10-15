import { Grid, Image, Spacer, Text } from '@nextui-org/react';
import { Layout } from 'components';

const Index = () => {
  return (
    <Layout>
      <Spacer />
      <Grid.Container justify='center'>
        <Grid xs={12} md={6} css={{ padding: '1.1rem' }}>
          <Image
            src='https://github.com/nextui-org/nextui/blob/next/apps/docs/public/nextui-banner.jpeg?raw=true'
            objectFit='scale-down'
            alt='Default Image'
            width={200}
            height={300}
          />
        </Grid>
        <Grid xs={12} md={6} css={{ padding: '1.1rem' }}>
          <div>
            <Text h1>Hi, I'm Nate</Text>
            <Text h2>
              I'm a frontend web developer focused on the future decentralized
              web.
            </Text>
          </div>
        </Grid>
      </Grid.Container>
    </Layout>
  );
};

export default Index;
