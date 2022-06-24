import { Card, CardBody, CardTitle, CardSubtitle, CardImg } from 'reactstrap';
import { Link } from 'react-router-dom';
import placeholder from '../images/food-placeholder.png';

export function RecipeCard(props) {
const { slug, title, preparationTime } = props;

  return (
    <Card className='h-100'>
      <Link to={`/recipe/${slug}`}>
        <CardImg src={placeholder} alt="Preview" top />
      </Link>
      <CardBody>
        <CardTitle tag="h5">{title}</CardTitle>
        <CardSubtitle>~{preparationTime} min</CardSubtitle>
      </CardBody>
    </Card>
  );
}
