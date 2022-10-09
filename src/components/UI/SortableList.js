import { React } from 'react';
import { ReactSortable } from 'react-sortablejs';
import { Row, Col, Button } from 'reactstrap';
import { FaTrashAlt, FaGripLines } from 'react-icons/fa';

import CustomAlert from './CustomAlert';

import styles from './SortableList.module.css';

export function SortableList({
  ingredients,
  setIngredients,
  onClick,
  ingredientsLength,
}) {
  if (ingredientsLength === 0) {
    return (
      <CustomAlert color="primary" text="Seznam ingrediencí je prázdný..." />
    );
  }

  return (
    <ReactSortable
      className="list-group list-group-flush"
      list={ingredients}
      setList={setIngredients}
    >
      {ingredients.map(({ _id, name, amount, amountUnit, isGroup }) => {
        const liStyles = isGroup ? styles.listItem : '';
        const colStyles = isGroup ? styles.col_isGroup : styles.col_isNotGroup;
        const icon = isGroup ? '' : <FaGripLines className={styles.icon} />;
        const textLg = isGroup ? 9 : 10;

        return (
          <div key={_id} className={`list-group-item ${liStyles}`}>
            <Row>
              {isGroup && (
                <Col xs={1}>
                  <FaGripLines className={styles.icon} />
                </Col>
              )}

              <Col xs={textLg} className={colStyles}>
                <div className={styles.col_text}>
                  {icon} {name}
                </div>
                <span className={styles.col_amount}>
                  {amount} {amountUnit}
                </span>
              </Col>

              <Col xs={2} className={styles.col_button}>
                <Button
                  id={_id}
                  className={`btn btn-danger btn-sm ${styles.deleteButton}`}
                  onClick={event => onClick(event.currentTarget.id)}
                >
                  <FaTrashAlt />
                </Button>
              </Col>
            </Row>
          </div>
        );
      })}
    </ReactSortable>
  );
}
