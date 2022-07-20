import { Container } from 'reactstrap';

export function Footer() {
  return (
    <div>
      <hr />
      <Container className='px-4' as="footer">
        <p>&copy; {new Date().getFullYear()} &middot; CN Group CZ a.s. | Made by Tomáš Olejník</p>
      </Container>
    </div>

  );
}
