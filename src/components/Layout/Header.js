import { Navbar, NavbarBrand } from 'reactstrap';

import styles from './Header.module.css';

export default function Header() {
  return (
    <Navbar className={styles.header} dark>
      <NavbarBrand className={styles.header_brand} href="/">
        <img src="\cookbook.png" className={styles.header_image} />
        <h2 className={styles.header_text}>CNU Cookbook</h2>
        <img src="\cutlery.png" className={styles.header_image} />
      </NavbarBrand>
    </Navbar>
  );
}
