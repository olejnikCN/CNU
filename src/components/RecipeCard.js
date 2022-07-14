import { Card, CardBody, CardTitle, CardImg, CardFooter } from 'reactstrap';
import { FaUtensilSpoon, FaClock } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import placeholder from '../images/food-placeholder.png';

import '../styles/RecipeCard.css';

export function RecipeCard(props) {
  const { slug, title, preparationTime, sideDish } = props;

  const minutesToHoursAndMinutes = (prepTime) => {
    prepTime = Number(prepTime);
    var hours = Math.floor(prepTime / 60);
    var minutes = Math.floor(prepTime % 60);

    var hoursDisplay = hours === 1 ? hours + " hodina" : hours >= 2 && hours <= 4 ? hours + " hodiny" : hours >= 5 ? hours + " hodin" : "";
    var comma = minutes > 0 && hours > 0 ? ", " : "";
    var minutesDisplay = minutes === 1 ? minutes + " minuta" : minutes >= 2 && minutes <= 4 ? minutes + " minuty" : minutes >= 5 ? minutes + " minut" : "";
    return hoursDisplay + comma + minutesDisplay;
  }

  return (
    <Link to={`/recipe/${slug}`} className="recipeLink">
      <Card className="h-100">
        <CardImg src={placeholder} alt="Preview" top />
        <CardBody>
          <CardTitle tag="h5">{title}</CardTitle>
        </CardBody>
        <CardFooter>
          <div>
            <FaClock className='me-2'/>~{minutesToHoursAndMinutes(preparationTime)}
          </div>
          <div>
            <FaUtensilSpoon className='me-2'/>{sideDish ? sideDish : "-"}
          </div>
        </CardFooter>
      </Card>
    </Link>
  );
}
