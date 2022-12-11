import React, { Fragment } from 'react';
import { Row, Col } from 'reactstrap';
import { FaTrashAlt, FaPlus } from 'react-icons/fa';

import HeadingWithButtonsSmall from '../Headings/HeadingWithButtonsSmall';
import SortableList from '../Lists/SortableList';
import ConfirmModal from '../UI/Modal';
import SelectSearch from '../Dropdowns/SelectSearch';
import NumberInputWithLabel from '../Inputs/NumberInputWithLabel';
import TextInputWithLabel from '../Inputs/TextInputWithLabel';

import styles from './RecipeIngredients.module.css';

export default function RecipeIngredients({
  toggleModalHandler,
  ingredients,
  setIngredients,
  deleteAllIngredientsModalState,
  ingredientName,
  setIngredientName,
  ingredientsArray,
  ingredientsAreLoading,
  ingredientsHasError,
  ingredientAmount,
  setIngredientAmount,
  ingredientUnit,
  setIngredientUnit,
  ingredientGroupName,
  setIngredientGroupName,
}) {
  const deleteIngredients = confirmParam => {
    //pokud dostane id, maže jednu ingredienci, jinak smaže všechny ingredience
    if (confirmParam) {
      //.splice společně s .findIndex najde ingredienci která bude smazaná
      const deletedIngredient = ingredients.splice(
        ingredients.findIndex(object => {
          return object._id === confirmParam;
        }),
        1,
      );
      //.filter se .some porovná každou ingredienci v seznamu s tou, která má být smazaná a vrátí jen ty které mají zůstat
      setIngredients(
        ingredients.filter(ingredient =>
          deletedIngredient.some(
            deletedIngredient => ingredient._id !== deletedIngredient._id,
          ),
        ),
      );
    } else {
      setIngredients([]);
      toggleModalHandler(false, 'deleteAllIngredients');
    }
  };

  const addNewIngredient = (isGroup, modalType) => {
    if (isGroup) {
      //vezme celý obsah ingredients listu a přidá k nim další ingredienci
      setIngredients(arr => [
        ...arr,
        {
          _id: _.uniqueId(),
          name: ingredientGroupName,
          amount: '',
          amountUnit: '',
          isGroup: true,
        },
      ]);
      setIngredientGroupName('');
    } else {
      setIngredients(arr => [
        ...arr,
        {
          _id: _.uniqueId(),
          name: ingredientName,
          amount: ingredientAmount.toString(),
          amountUnit: ingredientUnit,
          isGroup: false,
        },
      ]);
      setIngredientName('');
      setIngredientAmount('');
      setIngredientUnit('');
    }
  };

  return (
    <Fragment>
      <hr className={styles.hideHr} />

      <HeadingWithButtonsSmall
        headingText="Ingredience"
        btnClass={`btn btn-danger ${styles.headingTopButton}`}
        rowClass={styles.headingWithButtonsSmall}
        onClick={toggleModalHandler}
        icon={<FaTrashAlt className="mb-1" />}
        isGroup={false}
        isDisabled={ingredients.length === 0 ? true : false}
        modalType="deleteAllIngredients"
      />

      <ConfirmModal
        modalState={deleteAllIngredientsModalState}
        toggle={toggleModalHandler}
        confirm={deleteIngredients}
        confirmParam=""
        modalType="deleteAllIngredients"
        headerText="Potvrdit smazání"
        bodyText="Opravdu chcete smazat celý seznam ingrediencí?"
        btnYesText="Ano"
        btnNoText="Ne"
        btnYesColor="danger"
        btnNoColor="light"
      />

      <SortableList
        ingredients={ingredients}
        setIngredients={setIngredients}
        onClick={deleteIngredients}
        ingredientsLength={ingredients.length}
      />

      <hr />

      <HeadingWithButtonsSmall
        headingText="Přidat ingredienci"
        btnClass={`btn btn-success ${styles.headingTopButton}`}
        onClick={addNewIngredient}
        icon={<FaPlus className="mb-1" />}
        isGroup={false}
        isDisabled={ingredientName ? false : true}
      />

      <SelectSearch
        labelText="Název"
        itemName={ingredientName}
        setItemName={setIngredientName}
        items={ingredientsArray}
        isLoading={ingredientsAreLoading}
        hasError={ingredientsHasError}
        placeholderText=""
        maxValueLength={40}
      />

      <Row>
        <Col sm={6}>
          <NumberInputWithLabel
            name="Množství"
            placeholder=""
            value={ingredientAmount}
            setValue={setIngredientAmount}
            maxValueLength={10000}
          />
        </Col>

        <Col sm={6}>
          <TextInputWithLabel
            name="Jednotka"
            type="text"
            placeholder=""
            value={ingredientUnit}
            setValue={setIngredientUnit}
            maxValueLength={22}
          />
        </Col>
      </Row>

      <hr />

      <HeadingWithButtonsSmall
        headingText="Přidat skupinu ingrediencí"
        btnClass={`btn btn-success ${styles.headingTopButton}`}
        onClick={addNewIngredient}
        icon={<FaPlus className="mb-1" />}
        isGroup={true}
        isDisabled={ingredientGroupName ? false : true}
      />

      <TextInputWithLabel
        name="Název"
        type="text"
        placeholder=""
        value={ingredientGroupName}
        setValue={setIngredientGroupName}
        maxValueLength={30}
      />
    </Fragment>
  );
}
