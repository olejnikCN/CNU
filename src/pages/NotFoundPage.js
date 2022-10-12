import { Link } from 'react-router-dom';

import travolta from '../assets/images/travolta.gif';

import styles from './NotFoundPage.module.css';

export function NotFoundPage() {
  return (
    <div className={styles.page}>
      <h1>404 - Not found!</h1>
      <h4>Stránka nenalezena.</h4>
      <img src={travolta} className={styles.gif} />
      <div className={styles.link}>
        <Link to="/" className="btn btn-primary btn-lg" role="button">
          Zpět na hlavní stránku
        </Link>
      </div>
    </div>
  );
}
