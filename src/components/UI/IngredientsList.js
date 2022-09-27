import React, { Fragment } from 'react';
import { List } from 'reactstrap';

import CustomAlert from './CustomAlert';

export default function IngredientsList(props) {
  const { ingredients, servings } = props;

  return (
    <Fragment>
      <h4 className="d-flex justify-content-start my-3 bold">Ingredience</h4>

      <div>
        {ingredients.length !== 0 && (
          <List className="list-group list-group-flush">
            {ingredients.map(({ _id, amount, amountUnit, name, isGroup }) => {
              const liClass = isGroup
                ? ' list-group-item-light text-dark bold justify-content-center'
                : ' justify-content-between';

              if (servings && amount) {
                let tempAmount =
                  (Number(amount) / Number(servingCount)) * Number(servings);
                amount = parseFloat(
                  tempAmount % 1 === 0 ? tempAmount : tempAmount.toFixed(3),
                );
              }

              return (
                <div key={_id} className={'d-flex list-group-item' + liClass}>
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
