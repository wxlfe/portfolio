import { useRouter } from 'next/router';
import { default as NextLink } from 'next/link';
import { Avatar, Button, Grid, Link, Navbar, Text } from '@nextui-org/react';
import { IoLogoGithub, IoLogoLinkedin, IoMail } from 'react-icons/io5';

const Header = () => {
  const router = useRouter();
  const navigationItems = [
    {
      label: 'Experience',
      slug: 'experience',
    },
    {
      label: 'Skills',
      slug: 'skills',
    },
    {
      label: 'My Work',
      slug: 'my-work',
    },
  ];

  return (
    <Navbar isBordered variant='floating' css={{ background: 'none' }}>
      <Navbar.Brand css={{ flexGrow: 1, flexBasis: 0 }}>
        <NextLink href='/'>
          <Avatar src='/wxlfe-gold.svg' text='NW' size='xl' alt='Nate Wolfe' />
        </NextLink>
      </Navbar.Brand>
      <Navbar.Content
        enableCursorHighlight
        hideIn='xs'
        variant='highlight-solid-rounded'
      >
        {navigationItems.map((item, index) => (
          <Navbar.Item
            key={index}
            isActive={router.pathname.includes(item.slug)}
          >
            <Button light color='primary'>
              <NextLink href={`/${item.slug}`}>
                <Text b>{item.label}</Text>
              </NextLink>
            </Button>
          </Navbar.Item>
        ))}
      </Navbar.Content>
      <Navbar.Content hideIn='xs' css={{ flexGrow: 1, flexBasis: 0 }}>
        <Grid.Container gap={4} justify='flex-end'>
          <Grid xs={2} justify='center'>
            <Link href='mailto:nate@wxlfe.dev' css={{ fontSize: '$4xl' }}>
              <IoMail aria-label='Email' />
            </Link>
          </Grid>
          <Grid xs={2} justify='center'>
            <Link href='https://github.com/wxlfe' css={{ fontSize: '$4xl' }}>
              <IoLogoGithub aria-label='GitHub' />
            </Link>
          </Grid>
          <Grid xs={2} justify='center'>
            <Link
              href='https://linkedin.com/in/wxlfe'
              css={{ fontSize: '$4xl' }}
            >
              <IoLogoLinkedin aria-label='Linkedin' />
            </Link>
          </Grid>
        </Grid.Container>
      </Navbar.Content>
      <Navbar.Toggle showIn='xs' aria-label='toggle navigation' />
      <Navbar.Collapse>
        {navigationItems.map((item, index) => (
          <Navbar.CollapseItem key={index}>
            <NextLink color='inherit' href={`/${item.slug}`}>
              <Text h1>{item.label}</Text>
            </NextLink>
          </Navbar.CollapseItem>
        ))}
        <Navbar.CollapseItem>
          <Grid.Container gap={5} justify='flex-end'>
            <Grid xs={2} justify='center'>
              <Link href='mailto:nate@wxlfe.dev' style={{ fontSize: '$4xl' }}>
                <IoMail aria-label='Email' />
              </Link>
            </Grid>
            <Grid xs={2} justify='center'>
              <Link
                href='https://github.com/wxlfe'
                style={{ fontSize: '$4xl' }}
              >
                <IoLogoGithub aria-label='GitHub' />
              </Link>
            </Grid>
            <Grid xs={2} justify='center'>
              <Link
                href='https://linkedin.com/in/wxlfe'
                style={{ fontSize: '$4xl' }}
              >
                <IoLogoLinkedin aria-label='Linkedin' />
              </Link>
            </Grid>
          </Grid.Container>
        </Navbar.CollapseItem>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Header;
