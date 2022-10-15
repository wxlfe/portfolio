import { Header } from 'components';

const Layout = (props) => {
  return (
    <>
      <Header />
      {props.children}
    </>
  );
};

export default Layout;
