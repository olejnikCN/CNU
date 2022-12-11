//#region Imports
import React, { useEffect, useState, Fragment, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Alert, Row, Col } from 'reactstrap';
import { FaEdit, FaTrashAlt, FaChevronLeft } from 'react-icons/fa';

import ConfirmModal from '../components/UI/Modal';
import HeadingWithButtons from '../components/Headings/HeadingWithButtons';
import CustomAlert from '../components/UI/CustomAlert';
import MarkdownDirections from '../components/UI/MarkdownDirections';
import RecipeBadges from '../components/Recipes/RecipeBadges';
import ServingsInput from '../components/Inputs/ServingsInput';
import IngredientsList from '../components/Lists/IngredientsList';
import LoadingSpinner from '../components/UI/Spinner';

import { useAPIResponseHandler } from '../custom-hooks/useAPIResponseHandler';
import { ToastContext } from '../context/toast-context';
import { api } from '../api';
//#endregion

export default function RecipeDetailPage() {
  const toastCtx = useContext(ToastContext);

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

  if (isLoading) return <LoadingSpinner />;

  if (hasError)
    return (
      <Alert color="danger" className="center">
        Chyba pří načítání!
      </Alert>
    );

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
    let errorMsg = '';
    api
      .delete(`/recipes/${_id}`)
      .then(response =>
        useAPIResponseHandler(
          response,
          toastCtx,
          'Recept byl úspěšně smazán...',
          3000,
          title,
        ),
      )
      .catch(error => {
        if (error) {
          useAPIResponseHandler(error, toastCtx, '', 0, '');
          errorMsg = error;
        }
      })
      .finally(() => {
        setDeleteModalState(!deleteModalState);
        if (!errorMsg) leavePage('/');
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
    <Fragment>
      <HeadingWithButtons headingText={title} buttons={buttons} />

      <hr />

      {isRecipeEmpty() && (
        <h2>
          <CustomAlert color="danger" text="Žádné údaje!" />
        </h2>
      )}

      {!isRecipeEmpty() && (
        <Container>
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
        </Container>
      )}
    </Fragment>
  );
}
