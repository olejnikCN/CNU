import { Card, CardBody, CardTitle, CardImg, CardFooter, Button } from 'reactstrap';
import { FaUtensilSpoon, FaClock } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import placeholder from '../images/food-placeholder.png';

import '../styles/RecipeCard.css';
import { TimeFormatter } from '../functions/TimeFormatter';

export function RecipeCard(props) {
  const { slug, title, preparationTime, sideDish } = props;

  return (
    <Link to={`/recipe/${slug}`} className="recipeLink">
      <Card className="h-100">
        <CardImg src={placeholder} alt="Preview" top />
        <CardBody>
          <CardTitle tag="h5">{title}</CardTitle>
        </CardBody>
        { (sideDish || preparationTime) &&
          <CardFooter>
            { sideDish && <div> <FaUtensilSpoon className='me-2'/>{sideDish} </div> }
            { preparationTime && <div> <FaClock className='me-2'/>~{TimeFormatter(preparationTime)} </div> }
          </CardFooter>
        }
      </Card>
    </Link>
  );
}
