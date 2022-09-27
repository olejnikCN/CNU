import { Link } from 'react-router-dom';

import travolta from '../assets/images/travolta.gif';

export function NotFoundPage() {
  return (
    <div className="text-center">
      <h1>404 - Not found!</h1>
      <h4>Stránka nenalezena.</h4>
      <img
        src={travolta}
        alt="There is nothing here..."
        width="20%"
        height="20%"
      />
      <div className="mt-4 pt-3">
        <Link to="/" className="btn btn-primary btn-lg" role="button">
          Zpět na hlavní stránku
        </Link>
      </div>
    </div>
  );
}
