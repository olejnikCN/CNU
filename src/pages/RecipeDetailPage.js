import React, { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import { Container, Spinner, Alert, Row, Col, List } from 'reactstrap';
import { FaEdit, FaTrashAlt, FaClock, FaUtensilSpoon } from 'react-icons/fa';
import MDEditor from '@uiw/react-md-editor';
import { ConfirmModal } from '../components/Modal';
import { useNavigate } from "react-router-dom";

import { api } from '../api';
import { HeadingWithButtons } from '../components/HeadingWithButtons';
import { TimeFormatter } from '../functions/TimeFormatter';
import { InputWithLabel } from '../components/InputWithLabel';

export function RecipeDetailPage() {
  const { slug } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [servings, setServings] = useState();
  const [deleteModalState, setDeleteModalState] = useState(false);

  const navigate = useNavigate();

  useEffect(function loadRecipeOnUpdate() {
    setIsLoading(true);

    api.get(`/recipes/${slug}`)
      .then((response => {
        setRecipe(response.data);
      }))
      .catch(() => {
        setHasError(true);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [slug] );

  if(isLoading)
    return <div className="d-flex justify-content-center"><Spinner /></div>;

  if(hasError)
    <Alert color='danger'>Chyba!</Alert>;

  if(!recipe)
    return null;

  const { _id, title, preparationTime, ingredients, directions, sideDish, servingCount } = recipe;

  const buttons = [
    { onClickFunc: (() => { setDeleteModalState(!deleteModalState) }), className: "btn btn-lg primaryButton m-2", role: "button", text: "Smazat", btnColor: "danger",
    icon: <FaTrashAlt className='mb-1'/>, isDisabled: false, modalType: "deleteRecipe" },
    { onClickFunc: ((isGroup, modalType) => { console.log("EDIT CLICKED") }), className: "btn btn-lg primaryButton m-2", role: "button", text: "Upravit", btnColor: "warning",
    icon: <FaEdit className='mb-1'/>, isDisabled: false, modalType: "" }
  ];

  const leavePage = (param) => { navigate(param); };

  const deleteRecipe = () => {
    api.delete(`/recipes/${_id}`)
    .then((response) => {
      console.log(response);
    })
    .catch((error) => {
      console.log(error);
    })
    .finally(() => {
      setDeleteModalState(!deleteModalState);
      leavePage('/');
    });
  }

  const isRecipeEmpty = () => {
    if(!preparationTime && ingredients.length === 0 && !directions && !sideDish && !servingCount)
      return true;
    else
      return false;
  }

  return (
    <Container>
      <HeadingWithButtons headingText={title} buttons={buttons}></HeadingWithButtons>

      <ConfirmModal modalState={deleteModalState} toggle={() => setDeleteModalState(!deleteModalState)} confirm={deleteRecipe} headerText="Potvrzení smazání"
                    bodyText="Opravdu chcete smazat tento recept?" btnYesText="Ano" btnNoText="Ne" yesBtnColor="danger" noBtnColor="secondary">
      </ConfirmModal>

      <hr/>

      { isRecipeEmpty() && <div className='alert alert-warning d-flex justify-content-center' role="alert">Žádné údaje!</div> }

      <Row>
        <Col lg={5}>
          { preparationTime && <h6><FaClock className='me-2'/>~{TimeFormatter(preparationTime)}</h6> }
          { sideDish && <h6><FaUtensilSpoon className='me-2'/>{sideDish}</h6> }

          { (preparationTime || sideDish) && <hr/> }

          { servingCount &&
            <InputWithLabel name="" type="number" placeholder="..." value={servingCount} sideText="Počet porcí" sideTextIsPrepended={true} setValue={setServings}>
            </InputWithLabel>
          }

          { ingredients.length !== 0 && <h4 className="d-flex justify-content-center my-3">Ingredience</h4> }

          <List className='list-group list-group-flush'>
            {
              ingredients.map(({ _id, amount, amountUnit, name, isGroup }) => {
                const liClass = isGroup ? ' list-group-item-secondary bold justify-content-center' : ' justify-content-between';
                let calculatedAmount = amount;

                if(amount > 0)
                  calculatedAmount = (Number(amount) / Number(servingCount)) * Number(servings);

                return (
                  <div key={_id} className={'d-flex list-group-item' + liClass}>
                    <div>{name}</div>
                    <div className="bold">{calculatedAmount} {amountUnit}</div>
                  </div>
                );
              })
            }
          </List>
        </Col>
        <Col lg={7} data-color-mode="light">
          { directions && <h4 className="d-flex justify-content-center mb-3">Postup</h4> }

          <MDEditor.Markdown source={directions}/>
        </Col>
      </Row>
    </Container>
  );
}
