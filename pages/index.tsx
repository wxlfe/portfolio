import { Grid, Image, Text } from '@nextui-org/react';

const Index = () => {
  return (
    <>
      <Grid.Container gap={12} justify='center'>
        <Grid xs={12} md={6}>
          <Image
            src='https://github.com/nextui-org/nextui/blob/next/apps/docs/public/nextui-banner.jpeg?raw=true'
            objectFit='none'
            alt='Default Image'
            width={200}
            height={300}
          />
        </Grid>
        <Grid xs={12} md={6}>
          <div>
            <Text h1>Hi, I'm Nate</Text>
            <Text h2>
              I'm a frontend web developer focused on the future decentralized
              web.
            </Text>
          </div>
        </Grid>
      </Grid.Container>
    </>
  );
};

export default Index;
