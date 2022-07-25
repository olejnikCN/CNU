import { Container } from 'reactstrap';

import '../styles/Layout.css';

export function Footer() {
  return (
    <div className='bg-dark py-3 footerPosition' style={{'height': '56px', 'bottom': '0'}}>
      <Container className='px-4 text-light' as="footer">
        <p className='m-0'>&copy; {new Date().getFullYear()} &middot; CN Group CZ a.s.</p>
      </Container>
    </div>

  );
}
