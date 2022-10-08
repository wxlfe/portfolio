import { useRouter } from 'next/router';
import { Avatar, Navbar, Link } from '@nextui-org/react';

const Header = () => {
  const router = useRouter();
  const collapseItems = ['Experience', 'Skills', 'My Work'];

  return (
    <Navbar isBordered variant='floating'>
      <Navbar.Brand>
        <Avatar text='NW' size='xl' />
      </Navbar.Brand>
      <Navbar.Content enableCursorHighlight hideIn='xs' variant='underline'>
        <Navbar.Link
          href='/experience'
          isActive={router.pathname.includes('experience')}
        >
          Experience
        </Navbar.Link>
        <Navbar.Link
          href='/skills'
          isActive={router.pathname.includes('skills')}
        >
          Skills
        </Navbar.Link>
        <Navbar.Link
          href='/my-work'
          isActive={router.pathname.includes('my-work')}
        >
          My Work
        </Navbar.Link>
      </Navbar.Content>
      <Navbar.Toggle showIn='xs' aria-label='toggle navigation' />
      <Navbar.Collapse>
        {collapseItems.map((item, index) => (
          <Navbar.CollapseItem key={item}>
            <Link color='inherit' href='#'>
              {item}
            </Link>
          </Navbar.CollapseItem>
        ))}
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Header;
