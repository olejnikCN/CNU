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

export default function SortingDropdown({ filteredRecipes, onSortingChange }) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [selectedSorting, setSelectedSorting] = useState('Od A do Z');
  const [selectedSortingIcon, setSelectedSortingIcon] = useState(
    <FaSortAlphaDown className="me-2" />,
  );

  useEffect(() => {
    onSortingChange(RecipesSorting(selectedSorting, filteredRecipes));
  }, [selectedSorting]);

  const sortTitles = [
    { text: 'Od A do Z', icon: <FaSortAlphaDown className="me-2" /> },
    { text: 'Od Z do A', icon: <FaSortAlphaDownAlt className="me-2" /> },
    { text: 'Od nejdelší přípravy', icon: <FaClock className="me-2" /> },
    { text: 'Od nejkratší přípravy', icon: <FaRegClock className="me-2" /> },
  ];

  let dropdownIcon = '';
  if (dropdownOpen) dropdownIcon = <FaChevronUp className="ms-2" />;
  else dropdownIcon = <FaChevronDown className="ms-2" />;

  const onSortingHandler = event => {
    setSelectedSorting(sortTitles[event.target.value].text);
    setSelectedSortingIcon(sortTitles[event.target.value].icon);
  };

  const onToggleHandler = () => setDropdownOpen(prevState => !prevState);

  return (
    <Dropdown
      className="mb-3 mb-md-0 mt-0 mt-md-1"
      isOpen={dropdownOpen}
      toggle={onToggleHandler}
    >
      <DropdownToggle
        className="w-100 d-flex justify-content-center align-items-center"
        color="light"
      >
        Řazení:
        <div className="w-100 d-flex justify-content-start align-items-center ms-2">
          {selectedSortingIcon} {selectedSorting}
        </div>
        {dropdownIcon}
      </DropdownToggle>
      <DropdownMenu end>
        <DropdownItem id="0" onClick={onSortingHandler}>
          <FaSortAlphaDown className="mb-1 me-3" />
          {sortTitles[0].text}
        </DropdownItem>

        <DropdownItem id="1" onClick={onSortingHandler}>
          <FaSortAlphaDownAlt className="mb-1 me-3" />
          {sortTitles[1].text}
        </DropdownItem>

        <DropdownItem id="2" onClick={onSortingHandler}>
          <FaClock className="mb-1 me-3" />
          {sortTitles[2].text}
        </DropdownItem>

        <DropdownItem id="3" onClick={onSortingHandler}>
          <FaRegClock className="mb-1 me-3" />
          {sortTitles[3].text}
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
}
