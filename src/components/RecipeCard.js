import { Card, CardBody, CardTitle, CardSubtitle, CardImg } from 'reactstrap';
import { Link } from 'react-router-dom';
import placeholder from '../images/food-placeholder.png';

export function RecipeCard(props) {
  const { slug, title, preparationTime } = props;

  return (
    <Link to={`/recipe/${slug}`} className="recipeLink">
      <Card className="h-100">
        <CardImg src={placeholder} alt="Preview" top />
        <CardBody>
          <CardTitle tag="h5">{title}</CardTitle>
          <CardSubtitle>~{preparationTime} min</CardSubtitle>
        </CardBody>
      </Card>
    </Link>
  );
}
