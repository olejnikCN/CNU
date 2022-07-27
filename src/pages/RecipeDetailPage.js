import React, { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import { Container, Spinner, Alert, Row, Col, List, Input } from 'reactstrap';
import { FaEdit, FaTrashAlt, FaClock, FaUtensilSpoon, FaChevronLeft } from 'react-icons/fa';
import MDEditor from '@uiw/react-md-editor';
import { ConfirmModal } from '../components/Modal';
import { useNavigate } from "react-router-dom";

import { api } from '../api';
import { HeadingWithButtons } from '../components/HeadingWithButtons';
import { TimeFormatter } from '../functions/TimeFormatter';

import '../styles/Layout.css';
import '../styles/HideHr.css';

export function RecipeDetailPage() {
  const { slug } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [servings, setServings] = useState(0);
  const [deleteModalState, setDeleteModalState] = useState(false);

  const navigate = useNavigate();

  const buttons = [
    { onClickFunc: (() => { leavePage(`/`) }), className: "btn btn-light btn-lg primaryButton m-2 ps-2", role: "button", text: "Zpět",
      icon: <FaChevronLeft className='mb-1 me-1'/>, isDisabled: false, modalType: "" },
    { onClickFunc: (() => { leavePage(`/updateRecipe/${_id}`) }), className: "btn btn-warning btn-lg primaryButton m-2", role: "button", text: "Upravit",
      icon: <FaEdit className='mb-1'/>, isDisabled: false, modalType: "" },
    { onClickFunc: (() => { setDeleteModalState(!deleteModalState) }), className: "btn btn-danger btn-lg primaryButton m-2", role: "button", text: "Smazat",
      icon: <FaTrashAlt className='mb-1'/>, isDisabled: false, modalType: "deleteRecipe" }
  ];

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
    return (
      <div className="fixed-top d-flex h-100 w-100 justify-content-center align-items-center">
        <Spinner />
      </div>
    );

  if(hasError)
    <Alert color='danger'>Chyba!</Alert>;

  if(!recipe)
    return null;

  let { _id, title, preparationTime, ingredients, directions, sideDish, servingCount } = recipe;

  const isServingsInputDisabled = ingredients.length === 0 ? true : false;

  const leavePage = (param) => { navigate(param); };

  const deleteRecipe = () => {
    api.delete(`/recipes/${_id}`)
    .then((response) => {
      console.log(response.status);
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

  const parseValue = value => value < 1000 ? setServings(value) : setServings(1000);

  return (
    <Container>
      <HeadingWithButtons headingText={title} buttons={buttons}></HeadingWithButtons>

      <ConfirmModal modalState={deleteModalState} toggle={() => setDeleteModalState(!deleteModalState)} confirm={deleteRecipe} headerText="Potvrzení smazání"
                    bodyText="Opravdu chcete smazat tento recept?" btnYesText="Ano" btnNoText="Ne" yesBtnColor="danger" noBtnColor="light">
      </ConfirmModal>

      <hr/>

      { isRecipeEmpty() && <div className='alert alert-danger d-flex justify-content-center' role="alert">Žádné údaje!</div> }

      <Row>
        <Col lg={7} data-color-mode="light">
          { !isRecipeEmpty() &&
            <div>
              <h4 className="d-flex justify-content-center mb-3 bold">Postup</h4>

              { directions ? <MDEditor.Markdown source={directions} id='markdown'></MDEditor.Markdown>
                            : <div className='alert alert-primary d-flex justify-content-center' role="alert">Postup je prázdný...</div> }
            </div>
          }

        </Col>
        <Col lg={5}>
          <hr id="hideHr"/>

          { !isRecipeEmpty() &&
            <div className='d-flex flex-column mt-4 mt-lg-0'>
              <h5 className="w-100"><span className="badge bg-success w-100 d-flex justify-content-center"><FaUtensilSpoon className='me-2'/>{sideDish ? sideDish : "---"}</span></h5>
              <h5 className="w-100"><span className="badge bg-success w-100 d-flex justify-content-center"><FaClock className='me-2'/>{preparationTime ? TimeFormatter(preparationTime) : "---"}</span></h5>
            </div>
          }

          { !isRecipeEmpty() && <hr/> }

          { !isRecipeEmpty() &&
            <div className='input-group inputWithLabel'>
              <span className='input-group-text'>Počet porcí</span>
              { servingCount ?
                <Input type="number" placeholder="..." defaultValue={servingCount} onInput={event => parseValue(event.target.value)}
                        onBlur={event => event.target.value > 1000 ? event.target.value = 1000 : event.target.value = event.target.value}
                        maxLength={50} min={1} max={1000} disabled={isServingsInputDisabled}></Input>
                : <Input type="text" placeholder="..." value={"---"} disabled></Input>
              }
            </div>
          }

          { !isRecipeEmpty() && <h4 className="d-flex justify-content-center my-3 bold">Ingredience</h4> }

          { !isRecipeEmpty() &&
            <div>
              { ingredients.length !== 0 ?
                <List className='list-group list-group-flush'>
                {
                  ingredients.map(({ _id, amount, amountUnit, name, isGroup }) => {
                    const liClass = isGroup ? ' list-group-item-light text-dark bold justify-content-center' : ' justify-content-between';

                    if(servings && amount) {
                      let tempAmount = (Number(amount) / Number(servingCount)) * Number(servings);
                      amount = parseFloat(tempAmount % 1 === 0 ? tempAmount : tempAmount.toFixed(3));
                    }

                    return (
                        <div key={_id} className={'d-flex list-group-item' + liClass}>
                          <div>{name ? name : "---"}</div>
                          <div className="bold">{amount} {amountUnit}</div>
                        </div>
                    );
                  })
                }
                </List>
                : <div className='alert alert-primary d-flex justify-content-center' role="alert">Seznam ingrediencí je prázdný...</div>
              }
            </div>
          }
        </Col>
      </Row>
    </Container>
  );
}
