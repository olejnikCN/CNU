//#region Imports
import React, { useEffect, useState, Fragment } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Spinner, Alert, Row, Col } from 'reactstrap';
import { FaEdit, FaTrashAlt, FaChevronLeft } from 'react-icons/fa';

import { useNavigate } from 'react-router-dom';

import { api } from '../api';
import { ConfirmModal } from '../components/UI/Modal';
import { HeadingWithButtons } from '../components/Headings/HeadingWithButtons';
import CustomAlert from '../components/UI/CustomAlert';
import MarkdownDirections from '../components/UI/MarkdownDirections';
import RecipeBadges from '../components/Recipes/RecipeBadges';
import ServingsInput from '../components/UI/ServingsInput';

import IngredientsList from '../components/UI/IngredientsList';

//#endregion

export function RecipeDetailPage() {
  const { slug } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [servings, setServings] = useState(0);
  const [deleteModalState, setDeleteModalState] = useState(false);

  const navigate = useNavigate();

  const buttons = [
    {
      onClickFunc: () => {
        leavePage(`/`);
      },
      className: 'btn btn-light btn-lg primaryButton m-2 ps-2',
      text: 'Zpět',
      icon: <FaChevronLeft className="mb-1 me-1" />,
      isDisabled: false,
      modalType: '',
    },
    {
      onClickFunc: () => {
        leavePage(`/updateRecipe/${_id}`);
      },
      className: 'btn btn-warning btn-lg primaryButton m-2',
      text: 'Upravit',
      icon: <FaEdit className="mb-1" />,
      isDisabled: false,
      modalType: '',
    },
    {
      onClickFunc: () => {
        setDeleteModalState(!deleteModalState);
      },
      className: 'btn btn-danger btn-lg primaryButton m-2',
      text: 'Smazat',
      icon: <FaTrashAlt className="mb-1" />,
      isDisabled: false,
      modalType: 'deleteRecipe',
    },
  ];

  useEffect(
    function loadRecipeOnUpdate() {
      setIsLoading(true);

      api
        .get(`/recipes/${slug}`)
        .then(response => {
          setRecipe(response.data);
        })
        .catch(() => {
          setHasError(true);
        })
        .finally(() => {
          setIsLoading(false);
        });
    },
    [slug],
  );

  if (isLoading)
    return (
      <div className="fixed-top d-flex h-100 w-100 justify-content-center align-items-center">
        <Spinner />
      </div>
    );

  if (hasError) return <Alert color="danger">Chyba!</Alert>;

  if (!recipe) return null;

  let {
    _id,
    title,
    preparationTime,
    ingredients,
    directions,
    sideDish,
    servingCount,
  } = recipe;

  const isServingsInputDisabled = ingredients.length === 0 ? true : false;

  const leavePage = param => {
    navigate(param);
  };

  const deleteRecipe = () => {
    api
      .delete(`/recipes/${_id}`)
      .then(response => {
        console.log(response.status);
      })
      .catch(error => {
        console.log(error);
      })
      .finally(() => {
        setDeleteModalState(!deleteModalState);
        leavePage('/');
      });
  };

  const isRecipeEmpty = () => {
    if (
      !preparationTime &&
      ingredients.length === 0 &&
      !directions &&
      !sideDish &&
      !servingCount
    )
      return true;
    else return false;
  };

  const toggleModalHandler = () => setDeleteModalState(!deleteModalState);

  return (
    <Container>
      <HeadingWithButtons headingText={title} buttons={buttons} />

      <hr />

      {isRecipeEmpty() && (
        <h2>
          <CustomAlert color="danger" text="Žádné údaje!" />
        </h2>
      )}

      {!isRecipeEmpty() && (
        <Fragment>
          <ConfirmModal
            modalState={deleteModalState}
            toggle={toggleModalHandler}
            confirm={deleteRecipe}
            headerText="Potvrzení smazání"
            bodyText="Opravdu chcete smazat tento recept?"
            btnYesText="Ano"
            btnNoText="Ne"
            btnYesColor="danger"
            btnNoColor="light"
          />

          <Row>
            <Col lg={7} data-color-mode="light">
              <MarkdownDirections title="Postup" directions={directions} />
            </Col>
            <Col lg={5}>
              <RecipeBadges
                sideDish={sideDish}
                preparationTime={preparationTime}
              />

              <hr />

              <ServingsInput
                title="Počet porcí"
                servingCount={servingCount}
                isServingsInputDisabled={isServingsInputDisabled}
                onSetServings={setServings}
              />

              <IngredientsList
                ingredients={ingredients}
                servings={servings}
                servingCount={servingCount}
              />
            </Col>
          </Row>
        </Fragment>
      )}
    </Container>
  );
}
