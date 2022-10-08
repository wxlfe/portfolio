import { Grid, Link } from '@nextui-org/react';
import { IoLogoGithub, IoLogoLinkedin, IoMail } from 'react-icons/io5';

const Footer = () => {
  return (
    <footer>
      <Grid.Container gap={1} justify='center'>
        <Grid xs={3} justify='center'>
          <Link href='mailto:nate@wxlfe.dev' css={{ fontSize: '$5xl' }}>
            <IoMail />
          </Link>
        </Grid>
        <Grid xs={3} justify='center'>
          <Link href='https://github.com/wxlfe' css={{ fontSize: '$5xl' }}>
            <IoLogoGithub />
          </Link>
        </Grid>
        <Grid xs={3} justify='center'>
          <Link href='https://linkedin.com/in/wxlfe' css={{ fontSize: '$5xl' }}>
            <IoLogoLinkedin />
          </Link>
        </Grid>
      </Grid.Container>
    </footer>
  );
};

export default Footer;
