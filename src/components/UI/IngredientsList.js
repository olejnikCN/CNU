import React, { Fragment } from 'react';
import { List } from 'reactstrap';

import CustomAlert from './CustomAlert';

export default function IngredientsList({
  ingredients,
  servings,
  servingCount,
}) {
  return (
    <Fragment>
      <h4 className="d-flex justify-content-start my-3 bold">Ingredience</h4>

      <div>
        {ingredients.length !== 0 && (
          <List className="list-group list-group-flush">
            {ingredients.map(({ _id, amount, amountUnit, name, isGroup }) => {
              const liClass = ' justify-content-between';

              if (isGroup) {
                liClass =
                  ' list-group-item-light text-dark bold justify-content-center';
              }

              if (servings && amount) {
                let tempAmount = (amount / servingCount) * servings;
                if (tempAmount % 1 !== 0) tempAmount = tempAmount.toFixed(3);
                amount = parseFloat(tempAmount);
              }

              return (
                <div key={_id} className={`d-flex list-group-item ${liClass}`}>
                  <div>{name ? name : '---'}</div>
                  <div className="bold">
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
