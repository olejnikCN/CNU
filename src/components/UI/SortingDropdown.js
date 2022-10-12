import React, { useState, useEffect } from 'react';
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

import { RecipesSorting } from '../../functions/RecipesSorting';

import styles from './SortingDropdown.module.css';

export default function SortingDropdown({ filteredRecipes, onSortingChange }) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [selectedSorting, setSelectedSorting] = useState('Od A do Z');
  const [selectedSortingIcon, setSelectedSortingIcon] = useState(
    <FaSortAlphaDown className={styles.dropdown_optionIcon} />,
  );

  useEffect(() => {
    onSortingChange(
      RecipesSorting(selectedSorting, filteredRecipes),
      selectedSorting,
    );
  }, [selectedSorting]);

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
    setSelectedSorting(sortTitles[event.target.id].text);
    setSelectedSortingIcon(sortTitles[event.target.id].icon);
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
            {selectedSortingIcon} {selectedSorting}
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
