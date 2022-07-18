import { Link } from 'react-router-dom';

export function NotFoundPage() {
  return (
    <div className="text-center">
      <h1>404 - Not found!</h1>
      <h4>Kruciš! Stránka nenalezena.</h4>
      <div className="mt-4">
        <Link to="/" className="btn btn-primary btn-lg" role="button">
          Zpět na hlavní stránku
        </Link>
      </div>
    </div>
  );
}
