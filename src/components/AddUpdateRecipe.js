//#region Imports
import { Container, Row, Col, Spinner, Accordion, AccordionBody, AccordionHeader } from 'reactstrap';
import React, { useState, useEffect } from "react";
import _ from 'lodash';
import { FaTrashAlt, FaPlus, FaTimes, FaSave, FaExternalLinkAlt } from 'react-icons/fa';
import { useNavigate } from "react-router-dom";
import MDEditor from '@uiw/react-md-editor';

import { InputWithLabel } from './InputWithLabel';
import { Textarea } from './Textarea';
import { HeadingWithButtons } from './HeadingWithButtons';
import { SelectSearch } from './SelectSearch';
import { HeadingWithButtonsSmall } from './HeadingWithButtonsSmall';
import { ConfirmModal } from './Modal';
import { InfoModal } from './InfoModal';
import { SortableList } from './SortableList';
import { api } from '../api';
import { InfoAlert } from './InfoAlert';

import '../styles/HideHr.css';
import '../styles/AddRecipePage.css';
import '../styles/HeadingWithButtons.css';
//#endregion

export function AddUpdateRecipePage(props) {
  const { _id, apiEndpoint } = props;

  let newRecipe = {};
  let ingredientsList = [];

  //#region useState variables
  const [recipeName, setRecipeName] = useState("");
  const [recipeSlug, setRecipeSlug] = useState("");
  const [preparationTime, setPreparationTime] = useState(0);
  const [servingsNumber, setServingsNumber] = useState(0);
  const [sideDish, setSideDish] = useState("");
  const [preparationSteps, setPreparationSteps] = useState("");
  const [ingredients, setIngredients] = useState(ingredientsList);
  const [ingredientName, setIngredientName] = useState("");
  const [ingredientAmount, setIngredientAmount] = useState("");
  const [ingredientUnit, setIngredientUnit] = useState("");
  const [ingredientGroupName, setIngredientGroupName] = useState("");
  const [deleteAllIngredientsModalState, setDeleteAllIngredientsModalState] = useState(false);
  const [textareaInfoModalState, setTextareaInfoModalState] = useState(false);
  const [leavePageModalState, setLeavePageModalState] = useState(false);
  const [saveRecipeModalState, setSaveRecipeModalState] = useState(false);
  const [editRecipe, setEditRecipe] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [accordionOpen, setAccordionOpen] = useState('');
  const [sideDishesArray, setSideDishesArray] = useState([]);
  const [ingredientsArray, setIngredientsArray] = useState([]);
  const [sideDishesHasError, setSideDishesHasError] = useState(false);
  const [sideDishesIsLoading, setSideDishesIsLoading] = useState(false);
  const [ingredientsHasError, setIngredientsHasError] = useState(false);
  const [ingredientsIsLoading, setIngredientsIsLoading] = useState(false);
//#endregion

  const navigate = useNavigate();

  var slugify = require('slugify');

  const pageButtons = [
    { onClickFunc: (() => { handleSaveClick(); }), className: "btn btn-success btn-lg primaryButton m-2", role: "button", text: "Uložit",
      icon: <FaSave className='mb-1'/>, isDisabled: recipeName.length ? false : true, modalType: "saveRecipe" },
    { onClickFunc: ((isGroup, modalType) => { handleCancelClick(false, modalType) }), className: "btn btn-warning btn-lg primaryButton m-2",
      role: "button", text: "Zrušit", icon: <FaTimes className='mb-1'/>, isDisabled: false, modalType: "leavePage" }
  ];

  useEffect(function loadRecipesOnMount() {
    if(_id) {
      setIsLoading(true);

      api.get(`/recipes/${_id}`)
      .then((response) => {
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
          ingredients: response.data.ingredients
        });
        setRecipeSlug(response.data.slug);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
    }

    setSideDishesIsLoading(true);

    api.get('/recipes/side-dishes')
    .then((response) => {
      setSideDishesArray(response.data.map(item => ({ value: item,  label: item})));
    })
    .catch(() => {
      setSideDishesHasError(true);
    })
    .finally(() => {
      setSideDishesIsLoading(false);
    });

    setIngredientsIsLoading(true);

    api.get('/recipes/ingredients')
    .then((response) => {
      setIngredientsArray(response.data.map(item => ({ value: item,  label: item})));
    })
    .catch(() => {
      setIngredientsHasError(true);
    })
    .finally(() => {
      setIngredientsIsLoading(false);
    });
  }, [_id]);

  const addNewIngredient = (isGroup, modalType) => {
    if(isGroup) {
      //vezme celý obsah ingredients listu a přidá k nim další ingredienci
      setIngredients(arr => [...arr, {_id: _.uniqueId(), name: ingredientGroupName, amount: "", amountUnit: "", isGroup: true}]);
      setIngredientGroupName("");
    }
    else {
      setIngredients(arr => [...arr, {_id: _.uniqueId(), name: ingredientName, amount: ingredientAmount.toString(), amountUnit: ingredientUnit, isGroup: false}]);
      setIngredientName("");
      setIngredientAmount("");
      setIngredientUnit("");
    }
  };

  const saveRecipe = () => {
    fillRecipe();

    api.post(apiEndpoint, newRecipe)
    .then((response) => {
      console.log(response.status);
    })
    .catch((error) => {
      console.log(error);
    })
    .finally(() => {
      setSaveRecipeModalState(!saveRecipeModalState);
      if(_id)
        leavePage(`/recipe/${slugify(recipeName, {lower: true})}`)
      else
        leavePage('/');
    });
  };

  const fillRecipe = () => {
    newRecipe = {
      title: recipeName ? recipeName : "",
      preparationTime: preparationTime,
      servingCount: servingsNumber,
      sideDish: sideDish ? sideDish : "",
      directions: preparationSteps ? preparationSteps : "",
      ingredients: ingredients.map(({_id, ...keepAttributes}) => keepAttributes)
    };
  }

  const handleSaveClick = () => {
    fillRecipe();

    const isRecipeFullyFilled = newRecipe.title && newRecipe.preparationTime > 0 && newRecipe.servingCount > 0 &&
                                newRecipe.sideDish && newRecipe.directions && newRecipe.ingredients.length !== 0;

    if(isRecipeFullyFilled)
      saveRecipe();
    else
      setSaveRecipeModalState(!saveRecipeModalState);
  };

  const handleCancelClick = (isGroup, modalType) => {
    const isAnythingFilled = ingredients.length > 0 || recipeName.length > 0 || preparationTime > 0
          || servingsNumber > 0 || sideDish.length > 0 || preparationSteps.length > 0 ? true : false

    let newEditRecipe = {};
    if(_id) {
      newEditRecipe = {
        title: recipeName,
        preparationTime: preparationTime,
        servingCount: servingsNumber,
        sideDish: sideDish,
        directions: preparationSteps,
        ingredients: ingredients
      };
    }

    if(!leavePageModalState && !isAnythingFilled || (_.isEqual(editRecipe, newEditRecipe) && !_.isEmpty(editRecipe) && !_.isEmpty(newEditRecipe))) {
      if(_id)
        leavePage(`/recipe/${recipeSlug}`);
      else
        leavePage('/');
    }
    else
      toggleModal(isGroup, modalType);
  };

  const toggleModal = (isGroup, modalType) => {
    if(modalType === "deleteAllIngredients")
      setDeleteAllIngredientsModalState(!deleteAllIngredientsModalState);
    else if(modalType === "saveRecipeModal")
      setSaveRecipeModalState(!saveRecipeModalState);
    else if(modalType === "textareaInfo")
      setTextareaInfoModalState(!textareaInfoModalState);
    else
      setLeavePageModalState(!leavePageModalState);
  };

  const toggleAccordion = (id) => {
    accordionOpen === id ? setAccordionOpen() : setAccordionOpen(id);
  };

  const deleteIngredients = (confirmParam) => {
    //pokud dostane id, maže jednu ingredienci, jinak smaže všechny ingredience
    if(confirmParam) {
      //.splice společně s .findIndex najde ingredienci která bude smazaná
      const deletedIngredient = ingredients.splice(ingredients.findIndex(object => { return object._id === confirmParam; }), 1);
      //.filter se .some porovná každou ingredienci v seznamu s tou, která má být smazaná a vrátí jen ty které mají zůstat
      setIngredients(ingredients.filter(ingredient => deletedIngredient.some(deletedIngredient => ingredient._id !== deletedIngredient._id)));
    }
    else {
      setIngredients([]);
      toggleModal(false, "deleteAllIngredients");
    }
  };

  const leavePage = param => navigate(param);

  if(isLoading) {
    return (
      <div className="fixed-top d-flex h-100 w-100 justify-content-center align-items-center">
        <Spinner />
      </div>
    );
  }

  return (
    <Container>
      <HeadingWithButtons headingText={_id ? "Upravit recept" : "Přidat recept"} buttons={pageButtons} recipeName={recipeName}>
      </HeadingWithButtons>

      <ConfirmModal modalState={leavePageModalState} toggle={toggleModal} confirm={leavePage} confirmParam={'/'}
                    modalType="leavePageModal" headerText="Odcházíte" bodyText="Opravdu chcete zahodit všechny změny?"
                    btnYesText="Ano" btnNoText="Ne" yesBtnColor="warning" noBtnColor="light">
      </ConfirmModal>

      <ConfirmModal modalState={saveRecipeModalState} toggle={toggleModal} confirm={saveRecipe} confirmParam={''}
                    modalType="saveRecipeModal" headerText="Potvrzení uložení" bodyText="Nemáte vyplněny všechny údaje receptu!"
                    secondBodyText="Opravdu ho chcete uložit?" btnYesText="Ano" btnNoText="Ne" yesBtnColor="success" noBtnColor="light">
      </ConfirmModal>

      <hr/>

      <Row>
        <Col lg={7}>
          <h4 className='w-100 pb-2 d-flex justify-content-start bold'>Základní údaje</h4>

          <InputWithLabel name="Název receptu" type="text" placeholder="" value={recipeName} setValue={setRecipeName} maxValueLength={80} isRequired={true}>
          </InputWithLabel>

          <Row>
            <Col sm={6}>
              <InputWithLabel name="Čas přípravy" type="number" placeholder="" sideText="min." sideTextIsPrepended={false} value={preparationTime}
                              setValue={setPreparationTime}>
              </InputWithLabel>
            </Col>

            <Col sm={6}>
              <InputWithLabel name="Počet porcí" type="number" placeholder="" value={servingsNumber} setValue={setServingsNumber}></InputWithLabel>
            </Col>
          </Row>

          <SelectSearch labelText="Příloha(y)" itemName={sideDish} setItemName={setSideDish}
                        items={sideDishesArray} isLoading={sideDishesIsLoading} hasError={sideDishesHasError} placeholderText="" maxValueLength={50}>
          </SelectSearch>

          <Textarea labelName="Postup" rows="15" value={preparationSteps} setValue={setPreparationSteps} onClick={toggleModal} modalType="textareaInfo">
          </Textarea>

          <InfoModal modalState={textareaInfoModalState} toggle={toggleModal} modalType="textareaInfo" headerText="Jak na formátování?"
                      primaryText="Při psaní postupu můžete pro formátování textu používat značkovací jazyk Markdown." secondaryText="Jak na to?"
                      icon={<FaExternalLinkAlt className='mb-1 me-2'/>}>
          </InfoModal>

          <hr/>

          <Accordion flush open={accordionOpen} toggle={toggleAccordion}>
            <AccordionHeader targetId="1">
              <h4 className='w-100 d-flex justify-content-start bold'>Náhled formátování postupu</h4>
            </AccordionHeader>
            <AccordionBody accordionId="1">
              { preparationSteps
                ? <div data-color-mode="light"><MDEditor.Markdown className='mx-2' source={preparationSteps}/></div>
                : <InfoAlert text='Postup je prázdný.' />
              }
            </AccordionBody>
          </Accordion>
        </Col>

        <Col lg={5}>
          <hr id='hideHr'/>

          <HeadingWithButtonsSmall headingText="Ingredience" btnClass="btn btn-danger w-100 ingredientsTrash" rowClass="mb-2 mt-2"
                                    onClick={toggleModal} icon={<FaTrashAlt className='mb-1'/>} isGroup={false}
                                    isDisabled={ingredients.length === 0 ? true : false} modalType="deleteAllIngredients">
          </HeadingWithButtonsSmall>

          <ConfirmModal modalState={deleteAllIngredientsModalState} toggle={toggleModal} confirm={deleteIngredients} confirmParam={""}
                        modalType="deleteAllIngredients" headerText="Potvrdit smazání" bodyText="Opravdu chcete smazat celý seznam ingrediencí?"
                        btnYesText="Ano" btnNoText="Ne" yesBtnColor="danger" noBtnColor="light">
          </ConfirmModal>

          <SortableList ingredients={ingredients} setIngredients={setIngredients} onClick={deleteIngredients} ingredientsLength={ingredients.length}>
          </SortableList>

          <hr/>

          <HeadingWithButtonsSmall headingText="Přidat ingredienci" btnClass="btn btn-success primaryButton w-100"
                                    onClick={addNewIngredient} icon={<FaPlus className='mb-1'/>} isGroup={false} isDisabled={ ingredientName ? false : true }>
          </HeadingWithButtonsSmall>

          <SelectSearch labelText="Název" itemName={ingredientName} setItemName={setIngredientName}
                        items={ingredientsArray} isLoading={ingredientsIsLoading} hasError={ingredientsHasError} placeholderText="" maxValueLength={50}>
          </SelectSearch>

          <Row>
            <Col sm={6}>
              <InputWithLabel name="Množství" type="number" placeholder="" value={ingredientAmount} setValue={setIngredientAmount} maxValueLength={10000}>
              </InputWithLabel>
            </Col>

            <Col sm={6}>
              <InputWithLabel name="Jednotka" type="text" placeholder="" value={ingredientUnit} setValue={setIngredientUnit} maxValueLength={22}></InputWithLabel>
            </Col>
          </Row>

          <hr/>

          <HeadingWithButtonsSmall headingText="Přidat skupinu ingrediencí" btnClass="btn btn-success primaryButton w-100"
                                    onClick={addNewIngredient} icon={<FaPlus className='mb-1'/>} isGroup={true} isDisabled={ ingredientGroupName ? false : true }>
          </HeadingWithButtonsSmall>

          <InputWithLabel name="Název" type="text" placeholder="" value={ingredientGroupName} setValue={setIngredientGroupName}  maxValueLength={30}>
          </InputWithLabel>
        </Col>
      </Row>
    </Container>
  );
}
