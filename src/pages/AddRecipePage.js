import { Container, Row, Col, Button } from 'reactstrap';
import React, { useState } from "react";
import _ from 'lodash';
import { FaTrashAlt, FaPlus } from 'react-icons/fa';
import { MdDragHandle } from 'react-icons/md';
import { ReactSortable } from "react-sortablejs";

import { InputWithLabel } from '../components/InputWithLabel';
import { Textarea } from '../components/Textarea';
import { HeadingWithButtons } from '../components/HeadingWithButtons';
import { SelectSearch } from '../components/SelectSearch';
import '../styles/AddRecipePage.css';
import { HeadingWithButtonsSmall } from '../components/HeadingWithButtonsSmall';
import { ConfirmModal } from '../components/Modal';

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
    [ "/", "btn btn-warning btn-lg primaryButton m-2", "button", "Zrušit" ],
    [ "/", "btn btn-success btn-lg primaryButton m-2", "button", "Uložit" ]
  ];

  const [ingredientName, setIngredientName] = useState("");
  const [ingredientAmount, setIngredientAmount] = useState(0);
  const [ingredientUnit, setIngredientUnit] = useState("");
  const [ingredients, setIngredientsList] = useState(ingredientsList);
  const [ingredientGroupName, setIngredientGroupName] = useState("");
  const [modalState, setModalState] = useState(false);

  // console.group("Ingredience");
  // console.log(`Jméno: ` + ingredientName);
  // console.log(`Množství: ` + ingredientAmount);
  // console.log(`Jednotka: ` + ingredientUnit);
  // console.groupEnd();

  const addNewIngredient = () => {
    //vezme aktuální objekty v poli a přidá k nim nový objekt
    setIngredientsList(arr => [...arr, {_id: _.uniqueId(), name: ingredientName, amount: ingredientAmount.toString(), amountUnit: ingredientUnit, isGroup: false}]);
  };

  const addIngredientGroup = () => {
    //vezme aktuální objekty v poli a přidá k nim nový objekt
    setIngredientsList(arr => [...arr, {_id: _.uniqueId(), name: ingredientGroupName, amount: "", amountUnit: "", isGroup: true}]);
  };

  const deleteIngredients = (id) => {
    if(!id) {
      setIngredientsList([]);
      toggleModal();
    }
    else {
      console.log(id);
    }
  };

  const toggleModal = () => { setModalState(!modalState); };

  return (
    <Container>
      <HeadingWithButtons headingText="Přidat recept" buttons={pageButtons}></HeadingWithButtons>

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

          <InputWithLabel name="Příloha(y)" type="text" placeholder="Zadejte jednu nebo více možných příloh..."></InputWithLabel>

          <Textarea labelName="Postup" rows="20"></Textarea>
        </Col>

        <Col lg={6}>
          <HeadingWithButtonsSmall headingText="Ingredience" btnClass="btn btn-danger w-75 mx-1 ingredientsTrash" rowClass="mb-2"
                                    onClick={toggleModal} icon={<FaTrashAlt />}>
          </HeadingWithButtonsSmall>

          <ConfirmModal modalState={modalState} toggle={toggleModal} confirm={deleteIngredients}
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
                                onClick={event => { deleteIngredients(event.currentTarget.id);  }}>
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
                                    onClick={addNewIngredient} icon={<FaPlus />}>
          </HeadingWithButtonsSmall>

          <SelectSearch labelText="Název" ingredientName={ingredientName} setIngredientName={setIngredientName}></SelectSearch>

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
                                    onClick={addIngredientGroup} icon={<FaPlus />}>
          </HeadingWithButtonsSmall>

          <InputWithLabel name="Název" type="text" placeholder="Zadejte název skupiny..."
                          value={ingredientGroupName} setValue={setIngredientGroupName}>
          </InputWithLabel>
        </Col>
      </Row>
    </Container>
  );
}



