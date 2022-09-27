import { Card, CardBody, CardTitle, CardImg } from 'reactstrap';
import { FaUtensilSpoon, FaClock } from 'react-icons/fa';
import { Link } from 'react-router-dom';

import placeholder from '../../assets/images/food-placeholder-color.png';
import { TimeFormatter } from '../../functions/TimeFormatter';

import './RecipeCard.css';
import RecipeBadges from '../UI/RecipeBadges';

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
            <RecipeBadges
              sideDish={sideDish}
              preparationTime={preparationTime}
            />
          </div>
        </CardBody>
      </Card>
    </Link>
  );
}
