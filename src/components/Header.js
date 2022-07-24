import { Navbar, NavbarBrand, Nav, NavItem, NavLink, Container } from 'reactstrap';

import '../styles/AddRecipePage.css';
import '../styles/Header.css';
import '../styles/Layout.css';
import '../custom.scss';

export function Header() {

  return (
    <Navbar color="dark" className='headerShadow fixed-top py-0' dark>
      <Container className='bg-dark' style={{'minHeight': '55px'}}>
        <NavbarBrand className='mx-2 d-flex align-items-center center' href='/'>
          <img src="\cookbook.png" className='me-2' width={40} height={40}/>
          <h2 className='mb-0 mt-2' id='pageTitle'>CNU Cookbook</h2>
          <img src="\cutlery.png" className='ms-2' width={40} height={40}/>
        </NavbarBrand>
      </Container>
    </Navbar>
  );
}
