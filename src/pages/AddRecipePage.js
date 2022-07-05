import { Container, Row, Col, Button } from 'reactstrap';
import { useState } from "react";
import _ from 'lodash';

import { InputWithLabel } from '../components/InputWithlabel';
import { Textarea } from '../components/Textarea';
import { HeadingWithButtons } from '../components/HeadingWithButtons';
import { SelectSearch } from '../components/SelectSearch';

export function AddRecipePage() {
  const ingredientsList = [
    {_id: _.uniqueId(), name: "banán", amount: "2", amountUnit: "", isGroup: false},
    {_id: _.uniqueId(), name: "cukr", amount: "50", amountUnit: "g", isGroup: false},
    {_id: _.uniqueId(), name: "citronová kůra", amount: "", amountUnit: "trochu", isGroup: false},
  ];

  const buttons = [
    [ "/", "btn btn-success primaryButton m-2", "button", "Uložit" ],
    [ "/", "btn btn-warning primaryButton m-2", "button", "Zrušit" ]
  ];

  const [ingredientName, setIngredientName] = useState("");
  const [ingredientAmount, setIngredientAmount] = useState(0);
  const [ingredientUnit, setIngredientUnit] = useState("");
  const [ingredients, setIngredientsList] = useState(ingredientsList);

  console.group("Ingredience");
  console.log(`Jméno: ` + ingredientName);
  console.log(`Množství: ` + ingredientAmount);
  console.log(`Jednotka: ` + ingredientUnit);
  console.groupEnd();

  const addNewIngredient = () => {
    //vezme aktuální objekty v poli a přidá k nim nový objekt
    setIngredientsList(arr => [...arr, {_id: _.uniqueId(), name: ingredientName, amount: ingredientAmount.toString(), amountUnit: ingredientUnit, isGroup: false}]);
  };

  return (
    <Container>

      <HeadingWithButtons headingText="Přidat recept" buttons={buttons}></HeadingWithButtons>

      <hr/>

      <InputWithLabel name="Název receptu" type="text" placeholder="Zadejte název receptu..."></InputWithLabel>

      <InputWithLabel name="Čas přípravy" type="number" placeholder="Zadejte přibližnou délku přípravy..." sideText="min."></InputWithLabel>

      <InputWithLabel name="Počet porcí" type="number" placeholder="Zadejte počet porcí..."></InputWithLabel>

      <Textarea labelName="Postup" rows="5"></Textarea>

      <Row>
        <Col lg={6}>

          <h5>Přidat ingredienci</h5>

          <SelectSearch labelText="Název" ingredientName={ingredientName} setIngredientName={setIngredientName}></SelectSearch>

          <InputWithLabel name="Množství" type="number" placeholder="Zadejte množství..." value={ingredientAmount} setValue={setIngredientAmount}></InputWithLabel>

          <InputWithLabel name="Jednotka" type="text" placeholder="Zadejte jednotku..." value={ingredientUnit} setValue={setIngredientUnit}></InputWithLabel>

          <Button className='btn btn-success primaryButton m-2' onClick={() => { addNewIngredient(); }}>Přidat</Button>

        </Col>
        <Col lg={6}>

          <h5>Ingredience</h5>
          <ul className='list-group list-group-flush'>
            {
              ingredients.map(({ _id, name, amount, amountUnit, isGroup}) => {
                return (
                  <li key={_id} className='list-group-item'>
                    {name}{(amount || amountUnit) && ":"} {amount} {amountUnit}</li>
                );
              })
            }
          </ul>

        </Col>
      </Row>
    </Container>
  );
}



