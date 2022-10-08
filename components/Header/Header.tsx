import { Avatar, Navbar, Link } from '@nextui-org/react';

const Header = () => {
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
          <Navbar.Link key={item.slug} href={`/${item.slug}`}>
            {item.label}
          </Navbar.Link>
        ))}
      </Navbar.Content>
      <Navbar.Toggle showIn='xs' aria-label='toggle navigation' />
      <Navbar.Collapse>
        {navigationItems.map((item) => (
          <Navbar.CollapseItem key={item.slug}>
            <Link color='inherit' href={`/${item.slug}`}>
              {item.label}
            </Link>
          </Navbar.CollapseItem>
        ))}
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Header;
