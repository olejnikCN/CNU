import React, { createContext, useState } from 'react';
import { FaSortAlphaDown } from 'react-icons/fa';

import styles from '../components/Dropdowns/SortingDropdown.module.css';

const SortingContext = createContext({
  sorting: 'Od A do Z',
  sortingIcon: <FaSortAlphaDown className={styles.dropdown_optionIcon} />,
  updateSorting: (sorting, sortingIcon) => {},
});

const SortingContextProvider = props => {
  const [sorting, setSorting] = useState('Od A do Z');
  const [sortingIcon, setSortingIcon] = useState(
    <FaSortAlphaDown className={styles.dropdown_optionIcon} />,
  );

  const updateSorting = (sorting, sortingIcon) => {
    setSorting(sorting);
    setSortingIcon(sortingIcon);
  };

  return (
    <SortingContext.Provider
      value={{
        sorting: sorting,
        sortingIcon: sortingIcon,
        updateSorting: updateSorting,
      }}
    >
      {props.children}
    </SortingContext.Provider>
  );
};

export { SortingContext, SortingContextProvider };
