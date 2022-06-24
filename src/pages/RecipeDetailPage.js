import { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import { Container, Spinner, Alert, Row, Col, List } from 'reactstrap';

import { api } from '../api';

export function RecipeDetailPage() {
  const { slug } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);

  useEffect(function loadRecipeOnUpdate() {
    setIsLoading(true);

    api
      .get(`/recipes/${slug}`)
      .then(( response => {
        setRecipe(response.data);
      }))
      .catch(() => {
        setHasError(true);
      })
      .finally(() => {
        setIsLoading(false);
      });
    }, [slug] );

    console.log(recipe);

    if(isLoading) {
      return <Spinner />;
    }

    if(hasError) {
      <Alert color='danger'>Chyba!</Alert>;
    }

    if(!recipe) {
      return null;
    }

    const { title, preparationTime, ingredients, directions } = recipe;

  return (
    <Container>
      <h1>{title}</h1>
      <Row>
        <Col lg={4}>
          <h5>~{preparationTime} min.</h5>
          <List type="unstyled">
            {ingredients.map(({ _id, amount, amountUnit, name }) => {
              return (
                <li key={_id}>
                  {name}: {amount} {amountUnit}
                </li>
              );
            })}
          </List>
        </Col>
        <Col lg={8}>
          <p>{directions}</p>
        </Col>
      </Row>
    </Container>
  );
}
