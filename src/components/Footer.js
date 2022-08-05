import { Container } from 'reactstrap';

import '../styles/Layout.css';

export function Footer() {
  return (
    <div
      className="px-3 px-sm-0 bg-dark py-3 footerPosition"
      style={{ height: '56px', bottom: '0' }}
    >
      <Container
        className="text-light d-flex justify-content-between px-1"
        as="footer"
      >
        <p className="m-0">
          &copy; {new Date().getFullYear()} &middot; CN Group CZ a.s. | Vytvořil
          Tomáš Olejník
        </p>
      </Container>
    </div>
  );
}
