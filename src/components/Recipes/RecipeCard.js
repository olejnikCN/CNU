import { Card, CardBody, CardTitle, CardImg } from 'reactstrap';
import { Link } from 'react-router-dom';

import placeholder from '../../assets/images/food-placeholder-color.png';

import './RecipeCard.css';
import RecipeBadges from './RecipeBadges';

export function RecipeCard({ slug, title, preparationTime, sideDish }) {
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
