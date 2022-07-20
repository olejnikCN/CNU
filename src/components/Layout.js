import { Container, Div } from 'reactstrap';

import { Footer } from './Footer';
import { Header } from './Header';

export function Layout({ children }) {
  return (
    <div>
      <Header />
        <Container className="mt-4">{children}</Container>
      <Footer className="m-0"/>
    </div>

  );
}
