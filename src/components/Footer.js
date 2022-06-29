import { Container } from 'reactstrap';

export function Footer() {
  return (
    <Container as="footer">
      <hr />
      <p>&copy; {new Date().getFullYear()} &middot; CN Group CZ a.s. A Ciklum company</p>
    </Container>
  );
}
