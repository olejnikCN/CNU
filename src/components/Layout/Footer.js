import React from 'react';

import styles from './Footer.module.css';

export function Footer() {
  return (
    <div className={styles.footer} as="footer">
      <p className={styles.footer_text}>
        &copy; {new Date().getFullYear()} &middot; CN Group CZ a.s. | Vytvořil
        Tomáš Olejník
      </p>
    </div>
  );
}
