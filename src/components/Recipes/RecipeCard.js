import React from 'react';
import { Card, CardBody, CardTitle, CardImg } from 'reactstrap';
import { Link } from 'react-router-dom';

import RecipeBadges from './RecipeBadges';

import placeholder from '../../assets/images/food-placeholder-color.png';

import styles from './RecipeCard.module.css';

export function RecipeCard({ slug, title, preparationTime, sideDish }) {
  return (
    <Link to={`/recipe/${slug}`} className={styles.link}>
      <Card className={styles.card}>
        <CardImg src={placeholder} alt="Preview" />

        <CardBody className={styles.card_body}>
          <CardTitle tag="h5" className={styles.card_title}>
            {title}
          </CardTitle>
          <hr className={styles.hideHr} />
          <RecipeBadges sideDish={sideDish} preparationTime={preparationTime} />
        </CardBody>
      </Card>
    </Link>
  );
}
