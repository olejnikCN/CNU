import { Row, Col } from 'reactstrap';

import { RecipeCard } from './RecipeCard';

export function RecipesList({ recipes }) {
  return (
    <Row className="gy-4">
      {
        recipes.map(({ _id, slug, title, preparationTime, sideDish }) => {
          return (
            <Col key={_id} lg={3} md={4} sm={6} xs={12}>
              <RecipeCard slug={slug} title={title} preparationTime={preparationTime} sideDish={sideDish}/>
            </Col>
          );
        })
      }
    </Row>
  );
}
