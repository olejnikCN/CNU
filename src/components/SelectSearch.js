import React from 'react';
import CreatableSelect from 'react-select/creatable';

import '../styles/SelectSearch.css';

export function SelectSearch(props) {
  const {
    labelText,
    itemName,
    setItemName,
    items,
    isLoading,
    hasError,
    placeholderText,
    maxValueLength,
  } = props;

  const item = { value: itemName, label: itemName };

  const selectPlaceholder = () => {
    if (!hasError && !isLoading) return placeholderText;
    else if (hasError) return 'Nastala chyba při získávání seznamu!';
    else if (isLoading) return 'Načítání...';
    else return '..';
  };

  const handleChange = (value) => {
    if (value) {
      if (value.value.length <= maxValueLength) setItemName(value.value);
      else setItemName(value.value.substring(0, maxValueLength - 1));
    } else setItemName('');
  };

  const styles = {
    control: (provided, state) => ({
      ...provided,
      borderColor: state.isFocused ? 'rgba(34, 117, 165, 0.6)' : 'lightgray',
      boxShadow: state.isFocused ? '0 0 0 0.3rem rgba(34, 117, 165, 0.2);' : '',
      '&:hover': {
        borderColor: state.isFocused ? 'rgba(34, 117, 165, 0.6)' : 'lightgray',
      },
    }),
  };

  return (
    <form style={{ padding: '5px' }}>
      <label
        className="label mb-1"
        id="select-search-label"
        htmlFor="select-search"
      >
        {labelText}
      </label>

      <CreatableSelect
        isClearable={itemName ? true : false}
        onChange={handleChange}
        options={items}
        isLoading={isLoading}
        isDisabled={isLoading}
        placeholder={selectPlaceholder()}
        formatCreateLabel={(userInput) => `Přidat '${userInput}'`}
        value={item}
        styles={styles}
      />
    </form>
  );
}
