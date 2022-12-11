import React, { useState, useEffect, useContext } from 'react';
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from 'reactstrap';
import {
  FaChevronDown,
  FaChevronUp,
  FaSortAlphaDownAlt,
  FaSortAlphaDown,
  FaClock,
  FaRegClock,
} from 'react-icons/fa';

import { useRecipesSorting } from '../../custom-hooks/useRecipesSorting';
import { SortingContext } from '../../context/sorting-context';

import styles from './SortingDropdown.module.css';

export default function SortingDropdown({ filteredRecipes, onSortingChange }) {
  const sortingCtx = useContext(SortingContext);

  const [dropdownOpen, setDropdownOpen] = useState(false);

  useEffect(() => {
    onSortingChange(
      useRecipesSorting(sortingCtx.sorting, filteredRecipes),
      sortingCtx.sorting,
    );
  }, [sortingCtx.sorting]);

  const sortTitles = [
    {
      text: 'Od A do Z',
      icon: <FaSortAlphaDown className={styles.dropdown_optionIcon} />,
    },
    {
      text: 'Od Z do A',
      icon: <FaSortAlphaDownAlt className={styles.dropdown_optionIcon} />,
    },
    {
      text: 'Od nejdelší přípravy',
      icon: <FaClock className={styles.dropdown_optionIcon} />,
    },
    {
      text: 'Od nejkratší přípravy',
      icon: <FaRegClock className={styles.dropdown_optionIcon} />,
    },
  ];

  let dropdownIcon = '';
  if (dropdownOpen)
    dropdownIcon = <FaChevronUp className={styles.dropdown_toggleIcon} />;
  else dropdownIcon = <FaChevronDown className={styles.dropdown_toggleIcon} />;

  const sortingHandler = event => {
    sortingCtx.updateSorting(
      sortTitles[event.target.id].text,
      sortTitles[event.target.id].icon,
    );
  };

  const onToggleHandler = () => setDropdownOpen(prevState => !prevState);

  return (
    <Dropdown
      className={styles.dropdown}
      isOpen={dropdownOpen}
      toggle={onToggleHandler}
    >
      <DropdownToggle className={styles.dropdown_toggle}>
        <div>
          Řazení:
          <div className={styles.dropdown_selectedItem}>
            {sortingCtx.sortingIcon} {sortingCtx.sorting}
          </div>
        </div>
        {dropdownIcon}
      </DropdownToggle>
      <DropdownMenu end>
        <DropdownItem id="0" onClick={sortingHandler}>
          {sortTitles[0].icon}
          {sortTitles[0].text}
        </DropdownItem>

        <DropdownItem id="1" onClick={sortingHandler}>
          {sortTitles[1].icon}
          {sortTitles[1].text}
        </DropdownItem>

        <DropdownItem id="2" onClick={sortingHandler}>
          {sortTitles[2].icon}
          {sortTitles[2].text}
        </DropdownItem>

        <DropdownItem id="3" onClick={sortingHandler}>
          {sortTitles[3].icon}
          {sortTitles[3].text}
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
}
