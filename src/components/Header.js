import { Navbar, NavbarBrand, Nav, NavItem, NavLink, Container } from 'reactstrap';
import '../styles/AddRecipePage.css';
import '../styles/Header.css';

import '../styles/Layout.css';

export function Header() {

  return (
    <Navbar color="dark" className='headerShadow fixed-top' dark>
      <Container className='bg-dark'>
        <NavbarBrand className='mx-2 d-flex align-items-center center' href='/'>
          <img src="\cookbook.png" className='me-2' width={40} height={40}/>
          <div>CNU Cookbook</div>
          <img src="\cutlery.png" className='ms-2' width={40} height={40}/>
        </NavbarBrand>
      </Container>
    </Navbar>
  );
}
