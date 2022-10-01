import { React } from 'react';
import { ReactSortable } from 'react-sortablejs';
import { Row, Col, Button } from 'reactstrap';
import { FaTrashAlt, FaGripLines } from 'react-icons/fa';
import CustomAlert from './CustomAlert';

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

  const onClickHandler = () => event => onClick(event.currentTarget.id);

  return (
    <ReactSortable
      className="list-group list-group-flush"
      list={ingredients}
      setList={setIngredients}
    >
      {ingredients.map(({ _id, name, amount, amountUnit, isGroup }) => {
        const liClass = isGroup ? ' list-group-item-light text-dark bold' : '';
        const colClass = isGroup ? 'center' : 'between';
        const icon = isGroup ? '' : <FaGripLines className="me-2" />;
        const textLg = isGroup ? 9 : 10;
        const groupCol = '';
        if (isGroup)
          groupCol = (
            <Col xs={1}>
              <FaGripLines className="me-2" />
            </Col>
          );

        return (
          <div key={_id} className={`list-group-item ${liClass}`}>
            <Row>
              {groupCol}
              <Col
                xs={textLg}
                className={`pe-0 d-flex justify-content-${colClass}`}
              >
                <div className="d-flex align-items-center">
                  {icon} {name}
                </div>
                <span
                  className="bold d-flex align-items-center ps-3"
                  style={{ whiteSpace: 'nowrap' }}
                >
                  {amount} {amountUnit}
                </span>
              </Col>
              <Col
                xs={2}
                className="d-flex justify-content-end align-items-center"
              >
                <Button
                  id={_id}
                  className="btn btn-danger btn-sm mx-1 ingredientsTrash"
                  onClick={onClickHandler}
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
