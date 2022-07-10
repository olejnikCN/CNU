//#region Imports
import { Container, Row, Col, Button } from 'reactstrap';
import React, { useState } from "react";
import _ from 'lodash';
import { FaTrashAlt, FaPlus, FaCheck, FaTimes } from 'react-icons/fa';
import { MdDragHandle } from 'react-icons/md';
import { ReactSortable } from "react-sortablejs";
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
//#endregion

export function AddRecipePage() {
  let ingredientsList = [
    {_id: _.uniqueId(), name: "Těsto", amount: "", amountUnit: "", isGroup: true},
    {_id: _.uniqueId(), name: "Banán", amount: "2", amountUnit: "", isGroup: false},
    {_id: _.uniqueId(), name: "Cukr", amount: "50", amountUnit: "g", isGroup: false},
    {_id: _.uniqueId(), name: "Citronová kůra", amount: "", amountUnit: "", isGroup: false},
    {_id: _.uniqueId(), name: "Sůl", amount: "1", amountUnit: "špetka", isGroup: false},
    {_id: _.uniqueId(), name: "Mouka", amount: "200", amountUnit: "g", isGroup: false},
    {_id: _.uniqueId(), name: "Poleva", amount: "", amountUnit: "", isGroup: true},
    {_id: _.uniqueId(), name: "Mléko", amount: "100", amountUnit: "ml", isGroup: false},
    {_id: _.uniqueId(), name: "Čokoláda", amount: "100", amountUnit: "g", isGroup: false},
    {_id: _.uniqueId(), name: "Vanilkový cukr", amount: "1", amountUnit: "balení", isGroup: false},
  ];

  const pageButtons = [
    { onClickFunc: ((isGroup, modalType) => { toggleModal(false, modalType) }), className: "btn btn-lg primaryButton m-2", role: "button", text: "Zrušit", btnColor: "warning",
      icon: <FaTimes className='mb-1'/> },
    { onClickFunc: (() => { console.log("SAVE RECIPE") }), className: "btn btn-lg primaryButton m-2", role: "button", text: "Uložit", btnColor: "success",
      icon: <IconContext.Provider value={{ color: 'white' }}><FaCheck className='mb-1'/></IconContext.Provider> }
  ];

  const newRecipe = {};

  const [ingredientName, setIngredientName] = useState("");
  const [ingredientAmount, setIngredientAmount] = useState("");
  const [ingredientUnit, setIngredientUnit] = useState("");
  const [ingredients, setIngredientsList] = useState(ingredientsList);
  const [ingredientGroupName, setIngredientGroupName] = useState("");
  const [deleteAllIngredientsModalState, setDeleteAllIngredientsModalState] = useState(false);
  const [leavePageModalState, setLeavePageModalState] = useState(false);
  const [sideDish, setSideDish] = useState("");

  const navigate = useNavigate();

  const addNewIngredient = (isGroup) => {
    if(isGroup)
      //vezme celý obsah ingerdients listu a přidá k nim další ingredienci
      setIngredientsList(arr => [...arr, {_id: _.uniqueId(), name: ingredientGroupName, amount: "", amountUnit: "", isGroup: true}]);
    else
      setIngredientsList(arr => [...arr, {_id: _.uniqueId(), name: ingredientName, amount: ingredientAmount.toString(), amountUnit: ingredientUnit, isGroup: false}]);
  };

  const toggleModal = (isGroup, modalType) => {
    if(modalType === "deleteAllIngredients") {
      setDeleteAllIngredientsModalState(!deleteAllIngredientsModalState);
    }
    else {
      setLeavePageModalState(!leavePageModalState);
    }
  };

  const deleteIngredients = (confirmParam) => {
    //pokud dostane id, maže jednu ingredienci, jinak smaže všechny ingredience
    if(confirmParam) {
      //.splice společně s .findIndex najde ingredienci která bude smazaná
      const deletedIngredient = ingredients.splice(ingredients.findIndex(object => { return object._id === confirmParam; }), 1);
      //.filter se .some porovná každou ingredienci v seznamu s tou, která má být smazaná a vrátí jen ty které mají zůstat
      setIngredientsList(ingredients.filter(ingredient => deletedIngredient.some(deletedIngredient => ingredient._id !== deletedIngredient._id)));
    }
    else {
      setIngredientsList([]);
      toggleModal(false, "deleteAllIngredients");
    }
  };

  const leavePage = (confirmParam) => { navigate(confirmParam); };

  return (
    <Container>
      <HeadingWithButtons headingText="Přidat recept" buttons={pageButtons} modaltype="leavePage"></HeadingWithButtons>

      <ConfirmModal modalState={leavePageModalState} toggle={toggleModal} confirm={leavePage} confirmParam={'/'}
                    headerText="Odcházíte" bodyText="Opravdu chcete zahodit všechny změny?" btnYesText="Ano" btnNoText="Ne">
      </ConfirmModal>

      <hr/>

      <Row>
        <Col lg={6}>
          <h5 className='mb-2'>Základní údaje</h5>

          <InputWithLabel name="Název receptu" type="text" placeholder="Zadejte název receptu..."></InputWithLabel>

          <Row>
            <Col lg={6}>
              <InputWithLabel name="Čas přípravy" type="number" placeholder="Zadejte délku přípravy..." sideText="min."></InputWithLabel>
            </Col>

            <Col lg={6}>
              <InputWithLabel name="Počet porcí" type="number" placeholder="Zadejte počet porcí..."></InputWithLabel>
            </Col>
          </Row>

          <SelectSearch labelText="Příloha(y)" itemName={sideDish} setItemName={setSideDish}
                        apiEndpoint='/recipes/side-dishes' placeholderText="Vyberte přílohu(y) nebo zadejte jednu či více...">
          </SelectSearch>

          <Textarea labelName="Postup" rows="20"></Textarea>
        </Col>

        <Col lg={6}>
          <HeadingWithButtonsSmall headingText="Ingredience" btnClass="btn btn-danger w-75 mx-1 ingredientsTrash" rowClass="mb-2"
                                    onClick={toggleModal} icon={<FaTrashAlt />} isGroup={false} isDisabled={ ingredients.length ? false : true } modalType="deleteAllIngredients">
          </HeadingWithButtonsSmall>

          <ConfirmModal modalState={deleteAllIngredientsModalState} toggle={toggleModal} confirm={deleteIngredients} modalType="deleteAllIngredients"
                        headerText="Potvrdit smazání" bodyText="Opravdu chcete smazat celý seznam ingrediencí?" btnYesText="Ano" btnNoText="Ne">
          </ConfirmModal>

          <ReactSortable className='list-group list-group-flush' list={ingredients} setList={setIngredientsList}>
            {
              ingredients.map(({ _id, name, amount, amountUnit, isGroup}) => {
                const text = isGroup ? name : (amount || amountUnit) ? name + ': ' + amount + ' ' + amountUnit : name + '' + amount + '' + amountUnit;
                const liClass = isGroup ? 'list-group-item list-group-item-secondary bold' : 'list-group-item';
                const colClass = isGroup ? 'd-flex justify-content-center' : '';
                const icon = isGroup ? "" : <MdDragHandle />;
                const textLg = isGroup ? 9 : 10;
                const groupCol = isGroup ? <Col lg={1}><MdDragHandle /></Col> : "";

                return (
                  <div key={_id} className={liClass}>
                    <Row>
                      {groupCol}
                      <Col lg={textLg} className={colClass}>
                        {icon} {text}
                      </Col>
                      <Col lg={2}>
                        <Button id={_id} className='btn btn-danger btn-sm mx-1 ingredientsTrash'
                                onClick={event => { deleteIngredients(event.currentTarget.id); }}>
                          <FaTrashAlt />
                        </Button>
                      </Col>
                    </Row>
                  </div>
                );
              })
            }
          </ReactSortable>

          <hr/>

          <HeadingWithButtonsSmall headingText="Přidat ingredienci" btnClass="btn btn-success primaryButton w-75"
                                    onClick={addNewIngredient} icon={<FaPlus />} isGroup={false} isDisabled={ ingredientName ? false : true }>
          </HeadingWithButtonsSmall>

          <SelectSearch labelText="Název" itemName={ingredientName} setItemName={setIngredientName}
                        apiEndpoint='/recipes/ingredients' placeholderText="Vyberte ingredienci nebo zadejte novou...">
          </SelectSearch>

          <Row>
            <Col lg={6}>
              <InputWithLabel name="Množství" type="number" placeholder="Zadejte množství..."
                              value={ingredientAmount} setValue={setIngredientAmount}>
              </InputWithLabel>
            </Col>

            <Col lg={6}>
              <InputWithLabel name="Jednotka" type="text" placeholder="Zadejte jednotku..."
                              value={ingredientUnit} setValue={setIngredientUnit}>
              </InputWithLabel>
            </Col>
          </Row>

          <hr/>

          <HeadingWithButtonsSmall headingText="Přidat skupinu ingrediencí" btnClass="btn btn-success primaryButton w-75"
                                    onClick={addNewIngredient} icon={<FaPlus />} isGroup={true} isDisabled={ ingredientGroupName ? false : true }>
          </HeadingWithButtonsSmall>

          <InputWithLabel name="Název" type="text" placeholder="Zadejte název skupiny..."
                          value={ingredientGroupName} setValue={setIngredientGroupName}>
          </InputWithLabel>
        </Col>
      </Row>
    </Container>
  );
}
