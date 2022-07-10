import { Navbar, Container, NavbarBrand } from 'reactstrap';
import { GiCook, GiBookmarklet, GiKnifeFork } from 'react-icons/gi';

import '../styles/AddRecipePage.css'

export function Header() {
  return (
    <Navbar color="dark" dark>
      <Container>
        <NavbarBrand href="/" className='center'>
          <GiKnifeFork className='mx-2 mb-1'/>
            CN Cookbook
          <GiBookmarklet className='mx-2'/>
        </NavbarBrand>
      </Container>
    </Navbar>
  );
}
