import React, { useState, useEffect } from 'react';
import CreatableSelect from 'react-select/creatable';

import { api } from '../api';
import '../styles/SelectSearch.css';

export function SelectSearch(props) {
  const { labelText, itemName, setItemName, apiEndpoint, placeholderText } = props;

  const [items, setItems] = useState([]);
  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const item = { value: itemName, label: itemName };

  useEffect(function loadItemsOnMount() {
    setIsLoading(true);

    api.get(apiEndpoint)
    .then((response) => {
      let items = response.data.map(item => ({ value: item,  label: item}))

      setItems(items);
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
      return placeholderText;
    else if(hasError)
      return "Nastala chyba při získávání seznamu!";
    else if(isLoading)
      return "Načítání...";
    else
      return "..";
  }

  const handleChange = (value) => {
    if (value)
      setItemName(value.value);
    else
      setItemName("");
  };

  return (
    <form style={{'padding': '5px'}}>
      <label className='label' id="select-search-label" htmlFor="select-search">
        { labelText }
      </label>

      <CreatableSelect
        isClearable
        onChange={handleChange}
        options={items}
        isLoading={isLoading}
        isDisabled={isLoading}
        placeholder={selectPlaceholder()}
        formatCreateLabel={userInput => `Přidat '${userInput}'`}
        value={item}
      />
    </form>
  );
}
