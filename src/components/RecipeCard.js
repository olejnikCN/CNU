import { Card, CardBody, CardTitle, CardImg, Badge } from 'reactstrap';
import { FaUtensilSpoon, FaClock } from 'react-icons/fa';
import { Link } from 'react-router-dom';

import placeholder from '../images/food-placeholder-color.png';
import { TimeFormatter } from '../functions/TimeFormatter';

import '../styles/RecipeCard.css';

export function RecipeCard(props) {
  const { slug, title, preparationTime, sideDish } = props;

  return (
    <Link to={`/recipe/${slug}`} className="link">
      <Card className="h-100 card">
        <CardImg src={placeholder} alt="Preview" top />

        <CardBody className="footerParent">
          <CardTitle tag="h5" className="m-0 text-center">
            {title}
          </CardTitle>
          <div className="footerChild">
            <hr className="link nohover" />
            <div className="d-flex flex-column">
              <span className="badge bg-success w-100 mb-1">
                <FaUtensilSpoon className="me-2" />
                {sideDish ? sideDish : '---'}
              </span>
              <span className="badge bg-success w-100">
                <FaClock className="me-2" />
                {preparationTime ? TimeFormatter(preparationTime) : '---'}
              </span>
            </div>
          </div>
        </CardBody>
      </Card>
    </Link>
  );
}
