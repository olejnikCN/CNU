import { Row, Col } from 'reactstrap';

import { RecipeCard } from './RecipeCard';

export function RecipesList({ recipes }) {
  return (
    <Row className="gy-4">
      {recipes.map(({ _id, slug, title, preparationTime, sideDish }) => {
        return (
          <Col key={_id} xl={3} lg={4} md={6} sm={12}>
            <RecipeCard
              slug={slug}
              title={title}
              preparationTime={preparationTime}
              sideDish={sideDish}
            />
          </Col>
        );
      })}
    </Row>
  );
}
