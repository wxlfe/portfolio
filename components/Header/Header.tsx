import { useRouter } from 'next/router';
import { Avatar, Navbar, Link, Text } from '@nextui-org/react';

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
    <Navbar isBordered variant='floating'>
      <Navbar.Brand>
        <Link href='/'>
          <Avatar text='NW' size='xl' />
        </Link>
      </Navbar.Brand>
      <Navbar.Content enableCursorHighlight hideIn='xs' variant='underline'>
        {navigationItems.map((item, index) => (
          <Navbar.Link
            key={index}
            href={`/${item.slug}`}
            isActive={router.pathname.includes(item.slug)}
          >
            {item.label}
          </Navbar.Link>
        ))}
      </Navbar.Content>
      <Navbar.Toggle showIn='xs' aria-label='toggle navigation' />
      <Navbar.Collapse>
        {navigationItems.map((item, index) => (
          <Navbar.CollapseItem key={index}>
            <Link color='inherit' href={`/${item.slug}`}>
              <Text>{item.label}</Text>
            </Link>
          </Navbar.CollapseItem>
        ))}
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Header;
