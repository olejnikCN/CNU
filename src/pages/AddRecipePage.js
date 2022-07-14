//#region Imports
import { Container, Row, Col } from 'reactstrap';
import React, { useState } from "react";
import _ from 'lodash';
import { FaTrashAlt, FaPlus, FaTimes, FaSave } from 'react-icons/fa';
import { useNavigate } from "react-router-dom";
import { IconContext } from "react-icons";

import { InputWithLabel } from '../components/InputWithLabel';
import { Textarea } from '../components/Textarea';
import { HeadingWithButtons } from '../components/HeadingWithButtons';
import { SelectSearch } from '../components/SelectSearch';
import '../styles/AddRecipePage.css';
import '../styles/HeadingWithButtons.css';
import { HeadingWithButtonsSmall } from '../components/HeadingWithButtonsSmall';
import { ConfirmModal } from '../components/Modal';
import { SortableList } from '../components/SortableList';
import { api } from '../api';
//#endregion

export function AddRecipePage() {

  let newRecipe = {};
  let ingredientsList = [];

  const [recipeName, setRecipeName] = useState("");
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
  const [leavePageModalState, setLeavePageModalState] = useState(false);
  const [saveRecipeModalState, setSaveRecipeModalState] = useState(false);

  const pageButtons = [
    { onClickFunc: ((isGroup, modalType) => { handleCancelClick(false, modalType) }), className: "btn btn-lg primaryButton m-2", role: "button", text: "Zrušit", btnColor: "warning",
      icon: <FaTimes className='mb-1'/>, isDisabled: false, modalType: "leavePage" },
    { onClickFunc: (() => { handleSaveClick(); }), className: "btn btn-lg primaryButton m-2", role: "button", text: "Uložit", btnColor: "success",
      icon: <IconContext.Provider value={{ color: 'white' }}><FaSave className='mb-1'/></IconContext.Provider>, isDisabled: recipeName.length ? false : true, modalType: "saveRecipe" }
  ];

  // console.group('Recept');
  // console.log('Název: ' + recipeName);
  // console.log('Čas přípravy: ' + preparationTime);
  // console.log('Počet porcí: ' + servingsNumber);
  // console.log('Příloha(y): ' + sideDish);
  // console.log('Postup: ' + preparationSteps);
  // console.groupEnd();

  const navigate = useNavigate();

  const addNewIngredient = (isGroup, modalType) => {
    if(isGroup)
      //vezme celý obsah ingredients listu a přidá k nim další ingredienci
      setIngredients(arr => [...arr, {name: ingredientGroupName, amount: "", amountUnit: "", isGroup: true}]);
    else
      setIngredients(arr => [...arr, {name: ingredientName, amount: ingredientAmount.toString(), amountUnit: ingredientUnit, isGroup: false}]);
  };

  const saveRecipe = () => {
    fillRecipe();

    api.post('/recipes', newRecipe)
    .then((response) => {
      console.log(response);
    })
    .catch((error) => {
      console.log(error);
    });

    setSaveRecipeModalState(!saveRecipeModalState);
    leavePage('/');
  };

  const fillRecipe = () => {
    newRecipe = {
      title: recipeName,
      preparationTime: preparationTime,
      servingCount: servingsNumber,
      sideDish: sideDish,
      directions: preparationSteps,
      ingredients: ingredients
    };
  }

  const handleSaveClick = () => {
    fillRecipe();

    const isRecipeFullyFilled = recipeName.length !== 0 && preparationTime > 0 && servingsNumber > 0 &&
                                sideDish.length !== 0 && preparationSteps.length !== 0 && ingredients.length !== 0;

    if(isRecipeFullyFilled)
      saveRecipe();
    else
      setSaveRecipeModalState(!saveRecipeModalState);
  };

  const handleCancelClick = (isGroup, modalType) => {
    if(!leavePageModalState && ingredients.length === 0)
      leavePage('/');
    else
      toggleModal(isGroup, modalType);
  };

  const toggleModal = (isGroup, modalType) => {
    if(modalType === "deleteAllIngredients")
      setDeleteAllIngredientsModalState(!deleteAllIngredientsModalState);
    else if(modalType === "saveRecipeModal")
      setSaveRecipeModalState(!saveRecipeModalState);
    else
      setLeavePageModalState(!leavePageModalState);
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

  const leavePage = (param) => { navigate(param); };

  return (
    <Container>
      <HeadingWithButtons headingText="Přidat recept" buttons={pageButtons}></HeadingWithButtons>

      <ConfirmModal modalState={leavePageModalState} toggle={toggleModal} confirm={leavePage} confirmParam={'/'} modalType="leavePageModal"
                    headerText="Odcházíte" bodyText="Opravdu chcete zahodit všechny změny?" btnYesText="Ano" btnNoText="Ne">
      </ConfirmModal>

      <ConfirmModal modalState={saveRecipeModalState} toggle={toggleModal} confirm={saveRecipe} confirmParam={''} modalType="saveRecipeModal"
                    headerText="Potvrzení uložení" bodyText="Nemáte vyplněny všechny údaje receptu!" secondBodyText="Opravdu ho chcete uložit?" btnYesText="Ano" btnNoText="Ne">
      </ConfirmModal>

      <hr/>

      <Row>
        <Col lg={6}>
          <h5 className='mb-2'>Základní údaje</h5>

          <InputWithLabel name="Název receptu" type="text" placeholder="..." setValue={setRecipeName}></InputWithLabel>

          <Row>
            <Col lg={6}>
              <InputWithLabel name="Čas přípravy" type="number" placeholder="..." sideText="min." setValue={setPreparationTime}></InputWithLabel>
            </Col>

            <Col lg={6}>
              <InputWithLabel name="Počet porcí" type="number" placeholder="..." setValue={setServingsNumber}></InputWithLabel>
            </Col>
          </Row>

          <SelectSearch labelText="Příloha(y)" itemName={sideDish} setItemName={setSideDish}
                        apiEndpoint='/recipes/side-dishes' placeholderText="...">
          </SelectSearch>

          <Textarea labelName="Postup" rows="20" setValue={setPreparationSteps}></Textarea>
        </Col>

        <Col lg={6}>
          <HeadingWithButtonsSmall headingText="Ingredience" btnClass="btn btn-danger w-75 mx-1 ingredientsTrash" rowClass="mb-2"
                                    onClick={toggleModal} icon={<FaTrashAlt />} isGroup={false} isDisabled={ ingredients.length ? false : true } modalType="deleteAllIngredients">
          </HeadingWithButtonsSmall>

          <ConfirmModal modalState={deleteAllIngredientsModalState} toggle={toggleModal} confirm={deleteIngredients} confirmParam={""} modalType="deleteAllIngredients"
                        headerText="Potvrdit smazání" bodyText="Opravdu chcete smazat celý seznam ingrediencí?" btnYesText="Ano" btnNoText="Ne">
          </ConfirmModal>

          <SortableList ingredients={ingredients} setIngredients={setIngredients} onClick={deleteIngredients} ingredientsLength={ingredients.length}></SortableList>

          <hr/>

          <HeadingWithButtonsSmall headingText="Přidat ingredienci" btnClass="btn btn-success primaryButton w-75"
                                    onClick={addNewIngredient} icon={<FaPlus />} isGroup={false} isDisabled={ ingredientName ? false : true }>
          </HeadingWithButtonsSmall>

          <SelectSearch labelText="Název" itemName={ingredientName} setItemName={setIngredientName}
                        apiEndpoint='/recipes/ingredients' placeholderText="...">
          </SelectSearch>

          <Row>
            <Col lg={6}>
              <InputWithLabel name="Množství" type="number" placeholder="..." value={ingredientAmount} setValue={setIngredientAmount}></InputWithLabel>
            </Col>

            <Col lg={6}>
              <InputWithLabel name="Jednotka" type="text" placeholder="..." value={ingredientUnit} setValue={setIngredientUnit}></InputWithLabel>
            </Col>
          </Row>

          <hr/>

          <HeadingWithButtonsSmall headingText="Přidat skupinu ingrediencí" btnClass="btn btn-success primaryButton w-75"
                                    onClick={addNewIngredient} icon={<FaPlus />} isGroup={true} isDisabled={ ingredientGroupName ? false : true }>
          </HeadingWithButtonsSmall>

          <InputWithLabel name="Název" type="text" placeholder="..."
                          value={ingredientGroupName} setValue={setIngredientGroupName}>
          </InputWithLabel>
        </Col>
      </Row>
    </Container>
  );
}
