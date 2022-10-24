import React, { Fragment } from 'react';
import { List } from 'reactstrap';

import CustomAlert from '../UI/CustomAlert';

import styles from './IngredientsList.module.css';

export default function IngredientsList({
  ingredients,
  servings,
  servingCount,
}) {
  return (
    <Fragment>
      <h4 className={styles.heading}>Ingredience</h4>

      <div>
        {ingredients.length !== 0 && (
          <List className="list-group list-group-flush">
            {ingredients.map(({ _id, amount, amountUnit, name, isGroup }) => {
              let liStyles = isGroup ? styles.li_isGroup : styles.li_isNotGroup;

              if (servings && amount) {
                let tempAmount = (amount / servingCount) * servings;
                if (tempAmount % 1 !== 0) tempAmount = tempAmount.toFixed(3);
                amount = parseFloat(tempAmount);
              }

              return (
                <div key={_id} className={`list-group-item ${liStyles}`}>
                  <div>{name ? name : '---'}</div>
                  <div className={styles.amount}>
                    {amount} {amountUnit}
                  </div>
                </div>
              );
            })}
          </List>
        )}

        {ingredients.length === 0 && (
          <CustomAlert
            color="primary"
            text="Seznam ingrediencí je prázdný..."
          />
        )}
      </div>
    </Fragment>
  );
}
