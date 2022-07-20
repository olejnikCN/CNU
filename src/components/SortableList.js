import { React } from 'react';
import { ReactSortable } from "react-sortablejs";
import { Row, Col, Button } from 'reactstrap';
import { FaTrashAlt, FaGripLines } from 'react-icons/fa';

export function SortableList(props) {
  const { ingredients, setIngredients, onClick, ingredientsLength } = props;

  if(ingredientsLength === 0) {
    return (
      <div className='alert alert-info m-2' role="alert">
        Zatím jste nepřidali žádné ingredience.
      </div>
    );
  }
  else {
    return (
      <ReactSortable className='list-group list-group-flush' list={ingredients} setList={setIngredients}>
      {
        ingredients.map(({ _id, name, amount, amountUnit, isGroup}) => {
          const liClass = isGroup ? ' list-group-item-secondary bold' : '';
          const colClass = isGroup ? ' justify-content-center' : ' justify-content-between';
          const icon = isGroup ? "" : <FaGripLines className='me-2' />;
          const textLg = isGroup ? 9 : 10;
          const groupCol = isGroup ? <Col lg={1}><FaGripLines className='me-2' /></Col> : "";

          return (
            <div key={_id} className={'list-group-item' + liClass}>
              <Row>
                {groupCol}
                <Col lg={textLg} className={'d-flex' + colClass}>
                  <div>{icon} {name}</div>
                  <div className='bold'>{amount} {amountUnit}</div>
                </Col>
                <Col lg={2}>
                  <Button id={_id} className='btn btn-danger btn-sm mx-1 ingredientsTrash'
                          onClick={event => { onClick(event.currentTarget.id); }}>
                    <FaTrashAlt />
                  </Button>
                </Col>
              </Row>
            </div>
          );
      })
      }
    </ReactSortable>
    );
  }
}
