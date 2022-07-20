import { Navbar, NavbarBrand, Nav, NavItem, NavLink, Container } from 'reactstrap';
import { GiForkKnifeSpoon } from 'react-icons/gi';
import { FaList, FaPlus } from 'react-icons/fa';
import { HiOutlinePlusSm } from 'react-icons/hi';

import '../styles/AddRecipePage.css';
import '../styles/Header.css';

export function Header() {

  return (
    <Navbar color="dark" dark>
      <Container>
        <NavbarBrand className='mx-2 d-flex align-items-center center' href='/'>
          <img src="\cookbook.png" className='me-2' width={40} height={40}/>
          <div>CNU Cookbook</div>
          <img src="\cutlery.png" className='ms-2' width={40} height={40}/>
        </NavbarBrand>
      </Container>
    </Navbar>
  );
}
