import React, { useState, useEffect } from 'react';
import CreatableSelect from 'react-select/creatable';

import { api } from '../api';
import '../styles/SelectSearch.css';
import '../styles/InputWithLabel.css';

export function SelectSearch(props) {
  const { labelText, ingredientName, setIngredientName } = props;

  const [ingredients, setIngredients] = useState([]);
  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(function loadIngredientsOnMount() {
    setIsLoading(true);

    api.get('/recipes/ingredients')
    .then((response) => {
      let ingredients = response.data.map(ingredient => ({ value: ingredient,  label: ingredient}))

      setIngredients(ingredients);
    })
    .catch(() => {
      setHasError(true);
    })
    .finally(() => {
      setIsLoading(false);
    });

  }, []);

  const selectPlaceholder = () => {
    if(!hasError && !isLoading)
      return "Vyberte ingredienci nebo zadejte novou...";
    else if(hasError)
      return "Nastala chyba při získávání ingrediencí!";
    else if(isLoading)
      return "Načítání...";
    else
      return "";
  }

  const handleChange = newValue => {
    if (!newValue)
      newValue = { label: ingredientName, value: ingredientName };

    setIngredientName(newValue.value);
  };

  return (
    <form className='inputWithLabel'>
      <label className='label' id="select-search-label" htmlFor="select-search">
        { labelText }
      </label>

      <CreatableSelect
        isClearable
        onChange={handleChange}
        options={ingredients}
        isLoading={isLoading}
        isDisabled={isLoading}
        placeholder={selectPlaceholder()}
        formatCreateLabel={userInput => `Přidat '${userInput}'`}
      />
    </form>
  );
}
