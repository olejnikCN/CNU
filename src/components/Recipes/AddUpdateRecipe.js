//#region Imports
import { Container, Row, Col } from 'reactstrap';
import React, { useState, useEffect, useContext } from 'react';
import _ from 'lodash';
import { FaTimes, FaSave, FaExternalLinkAlt } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

import HeadingWithButtons from '../Headings/HeadingWithButtons';
import ConfirmModal from '../UI/Modal';
import InfoModal from '../UI/InfoModal';
import LoadingSpinner from '../UI/Spinner';
import RecipeDetails from './RecipeDetails';
import RecipeIngredients from './RecipeIngredients';

import { useAPIResponseHandler } from '../../custom-hooks/useAPIResponseHandler';
import { ToastContext } from '../../context/toast-context';
import { api } from '../../api';
//#endregion

export function AddUpdateRecipePage({ _id, apiEndpoint }) {
  let newRecipe = {};
  let ingredientsList = [];

  //#region useState variables
  const [recipeName, setRecipeName] = useState('');
  const [recipeSlug, setRecipeSlug] = useState('');
  const [preparationTime, setPreparationTime] = useState(0);
  const [servingsNumber, setServingsNumber] = useState(0);
  const [sideDish, setSideDish] = useState('');
  const [preparationSteps, setPreparationSteps] = useState('');
  const [ingredients, setIngredients] = useState(ingredientsList);
  const [ingredientName, setIngredientName] = useState('');
  const [ingredientAmount, setIngredientAmount] = useState('');
  const [ingredientUnit, setIngredientUnit] = useState('');
  const [ingredientGroupName, setIngredientGroupName] = useState('');
  const [deleteAllIngredientsModalState, setDeleteAllIngredientsModalState] =
    useState(false);
  const [textareaInfoModalState, setTextareaInfoModalState] = useState(false);
  const [leavePageModalState, setLeavePageModalState] = useState(false);
  const [saveRecipeModalState, setSaveRecipeModalState] = useState(false);
  const [editRecipe, setEditRecipe] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [sideDishesArray, setSideDishesArray] = useState([]);
  const [ingredientsArray, setIngredientsArray] = useState([]);
  const [sideDishesHasError, setSideDishesHasError] = useState(false);
  const [sideDishesIsLoading, setSideDishesIsLoading] = useState(false);
  const [ingredientsHasError, setIngredientsHasError] = useState(false);
  const [ingredientsAreLoading, setIngredientsAreLoading] = useState(false);
  //#endregion

  const toastCtx = useContext(ToastContext);
  const navigate = useNavigate();
  var slugify = require('slugify');

  const MODAL_TYPES = {
    deleteAllIngredients: 'deleteAllIngredients',
    saveRecipe: 'saveRecipeModal',
    textareaInfo: 'textareaInfo',
    leavePage: 'leavePage',
  };

  const pageButtons = [
    {
      onClickFunc: () => {
        handleSaveClick();
      },
      className: 'btn btn-success btn-lg primaryButton m-2',
      role: 'button',
      text: 'Uložit',
      icon: <FaSave className="mb-1" />,
      isDisabled: recipeName.length ? false : true,
      modalType: 'saveRecipe',
    },
    {
      onClickFunc: (isGroup, modalType) => {
        handleCancelClick(false, modalType);
      },
      className: 'btn btn-warning btn-lg primaryButton m-2',
      role: 'button',
      text: 'Zrušit',
      icon: <FaTimes className="mb-1" />,
      isDisabled: false,
      modalType: 'leavePage',
    },
  ];

  useEffect(
    function loadRecipesOnMount() {
      let isMounted = true;
      if (_id) {
        //API call na recept
        setIsLoading(true);
        api
          .get(`/recipes/${_id}`)
          .then(response => {
            setRecipeName(response.data.title);
            setPreparationTime(response.data.preparationTime);
            setServingsNumber(response.data.servingCount);
            setSideDish(response.data.sideDish);
            setPreparationSteps(response.data.directions);
            setIngredients(response.data.ingredients);
            setEditRecipe({
              title: response.data.title,
              preparationTime: response.data.preparationTime,
              servingCount: response.data.servingCount,
              sideDish: response.data.sideDish,
              directions: response.data.directions,
              ingredients: response.data.ingredients,
            });
            setRecipeSlug(response.data.slug);
          })
          .catch(error => {
            console.log(error);
          })
          .finally(() => {
            setIsLoading(false);
          });
      }

      //API call na přílohy
      setSideDishesIsLoading(true);
      api
        .get('/recipes/side-dishes')
        .then(response => {
          setSideDishesArray(
            response.data.map(item => ({ value: item, label: item })),
          );
        })
        .catch(() => {
          setSideDishesHasError(true);
        })
        .finally(() => {
          setSideDishesIsLoading(false);
        });

      //API call na ingredience
      setIngredientsAreLoading(true);
      api
        .get('/recipes/ingredients')
        .then(response => {
          setIngredientsArray(
            response.data.map(item => ({ value: item, label: item })),
          );
        })
        .catch(() => {
          setIngredientsHasError(true);
        })
        .finally(() => {
          setIngredientsAreLoading(false);
        });
      return () => (isMounted = false);
    },
    [_id],
  );

  const saveRecipe = () => {
    fillRecipe();

    let responseStatus = 0;
    let toastText = `Recept byl úspěšně upraven...`;
    if (_id === undefined) toastText = 'Nový recept byl úspěšně vytvořen...';

    api
      .post(apiEndpoint, newRecipe)
      .then(response => {
        useAPIResponseHandler(response, toastCtx, toastText, 3000, recipeName);
        responseStatus = response.status;
      })
      .catch(error => {
        if (error) {
          useAPIResponseHandler(error, toastCtx, '', 0, '');
          responseStatus = 404;
        }
      })
      .finally(() => {
        if (responseStatus < 400) {
          if (_id) {
            leavePage(`/recipe/${slugify(recipeName, { lower: true })}`);
            setSaveRecipeModalState(prevState => !prevState);
          } else leavePage('/');
        }
      });
  };

  const fillRecipe = () => {
    newRecipe = {
      title: recipeName ? recipeName : '',
      preparationTime: preparationTime,
      servingCount: servingsNumber,
      sideDish: sideDish ? sideDish : '',
      directions: preparationSteps ? preparationSteps : '',
      ingredients: ingredients.map(
        ({ _id, ...keepAttributes }) => keepAttributes,
      ),
    };
  };

  const handleSaveClick = () => {
    fillRecipe();

    const isRecipeFullyFilled =
      newRecipe.title &&
      newRecipe.preparationTime > 0 &&
      newRecipe.servingCount > 0 &&
      newRecipe.sideDish &&
      newRecipe.directions &&
      newRecipe.ingredients.length !== 0;

    if (isRecipeFullyFilled) saveRecipe();
    else setSaveRecipeModalState(prevState => !prevState);
  };

  const handleCancelClick = (isGroup, modalType) => {
    let isAnythingFilled = false;
    if (
      ingredients.length > 0 ||
      recipeName.length > 0 ||
      preparationTime > 0 ||
      servingsNumber > 0 ||
      sideDish.length > 0 ||
      preparationSteps.length > 0
    )
      isAnythingFilled = true;
    else isAnythingFilled = false;

    let newEditRecipe = {};
    if (_id) {
      newEditRecipe = {
        title: recipeName,
        preparationTime: preparationTime,
        servingCount: servingsNumber,
        sideDish: sideDish,
        directions: preparationSteps,
        ingredients: ingredients,
      };
    }

    const leavePageHandler = () => {
      if (
        (!leavePageModalState && !isAnythingFilled) ||
        (_.isEqual(editRecipe, newEditRecipe) &&
          !_.isEmpty(editRecipe) &&
          !_.isEmpty(newEditRecipe))
      )
        return true;
      return false;
    };

    if (leavePageHandler()) {
      if (_id) leavePage(`/recipe/${recipeSlug}`);
      else leavePage('/');
    } else toggleModalHandler(isGroup, modalType);
  };

  const toggleModalHandler = (isGroup, modalType) => {
    switch (modalType) {
      case MODAL_TYPES.deleteAllIngredients:
        setDeleteAllIngredientsModalState(prevState => !prevState);
        break;
      case MODAL_TYPES.saveRecipe:
        setSaveRecipeModalState(prevState => !prevState);
        break;
      case MODAL_TYPES.textareaInfo:
        setTextareaInfoModalState(prevState => !prevState);
      default:
        setLeavePageModalState(prevState => !prevState);
        break;
    }
  };

  const leavePage = param => navigate(param);

  if (isLoading) return <LoadingSpinner />;

  return (
    <Container>
      <ConfirmModal
        modalState={leavePageModalState}
        toggle={toggleModalHandler}
        confirm={leavePage}
        confirmParam="/"
        modalType={MODAL_TYPES.leavePage}
        headerText="Odcházíte"
        bodyText="Opravdu chcete zahodit všechny změny?"
        btnYesText="Ano"
        btnNoText="Ne"
        btnYesColor="warning"
        btnNoColor="light"
      />

      <ConfirmModal
        modalState={saveRecipeModalState}
        toggle={toggleModalHandler}
        confirm={saveRecipe}
        confirmParam=""
        modalType={MODAL_TYPES.saveRecipe}
        headerText="Potvrzení uložení"
        bodyText="Nemáte vyplněny všechny údaje receptu!"
        secondBodyText="Opravdu ho chcete uložit?"
        btnYesText="Ano"
        btnNoText="Ne"
        btnYesColor="success"
        btnNoColor="light"
      />

      <InfoModal
        modalState={textareaInfoModalState}
        toggle={toggleModalHandler}
        modalType={MODAL_TYPES.textareaInfo}
        headerText="Jak na formátování?"
        primaryText="Při psaní postupu můžete pro formátování textu používat značkovací jazyk Markdown."
        secondaryText="Jak na to?"
        icon={<FaExternalLinkAlt className="mb-1 me-2" />}
      />

      <HeadingWithButtons
        headingText={_id ? 'Upravit recept' : 'Přidat recept'}
        buttons={pageButtons}
      />

      <hr />

      <Row>
        <Col lg={7}>
          <RecipeDetails
            recipeName={recipeName}
            setRecipeName={setRecipeName}
            preparationTime={preparationTime}
            setPreparationTime={setPreparationTime}
            servingsNumber={servingsNumber}
            setServingsNumber={setServingsNumber}
            sideDish={sideDish}
            setSideDish={setSideDish}
            sideDishesArray={sideDishesArray}
            sideDishesIsLoading={sideDishesIsLoading}
            sideDishesHasError={sideDishesHasError}
            preparationSteps={preparationSteps}
            setPreparationSteps={setPreparationSteps}
            toggleModalHandler={toggleModalHandler}
          />
        </Col>

        <Col lg={5}>
          <RecipeIngredients
            toggleModalHandler={toggleModalHandler}
            ingredients={ingredients}
            setIngredients={setIngredients}
            deleteAllIngredientsModalState={deleteAllIngredientsModalState}
            ingredientName={ingredientName}
            setIngredientName={setIngredientName}
            ingredientsArray={ingredientsArray}
            ingredientsAreLoading={ingredientsAreLoading}
            ingredientsHasError={ingredientsHasError}
            ingredientAmount={ingredientAmount}
            setIngredientAmount={setIngredientAmount}
            ingredientUnit={ingredientUnit}
            setIngredientUnit={setIngredientUnit}
            ingredientGroupName={ingredientGroupName}
            setIngredientGroupName={setIngredientGroupName}
          />
        </Col>
      </Row>
    </Container>
  );
}
