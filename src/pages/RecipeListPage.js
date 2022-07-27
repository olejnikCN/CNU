//#region Imports
import { useEffect, useState } from 'react';
import { Container, Spinner, Alert, Row, Col, Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import React from 'react';
import { useNavigate } from "react-router-dom";
import { FaChevronDown, FaChevronUp, FaUtensils, FaSortAlphaDownAlt, FaSortAlphaDown, FaClock, FaRegClock } from 'react-icons/fa';

import { api } from '../api';
import { RecipesList } from '../components/RecipesList';
import { SearchInput } from '../components/SearchInput';
import { HeadingWithButtons } from '../components/HeadingWithButtons';

import '../styles/HeadingWithButtons.css';
//#endregion

export function RecipeListPage() {
  const [recipes, setRecipes] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [selectedSorting, setSelectedSorting] = useState("Od A do Z");
  const [selectedSortingIcon, setSelectedSortingIcon] = useState(<FaSortAlphaDown className='me-2'/>);

  const sortStrings = ["Od A do Z", "Od Z do A", "Od nejdelší přípravy", "Od nejkratší přípravy"];

  const sortStringsIcons = [
    <FaSortAlphaDown className='me-2'/>,
    <FaSortAlphaDownAlt className='me-2'/>,
    <FaClock className='me-2'/>,
    <FaRegClock className='me-2'/>
  ];

  let filteredRecipes = [];

  let sortedRecipes = [];

  const navigate = useNavigate();

  const buttonProps = [{
    onClickFunc: ((isGroup, modalType) => { navigate(modalType); }),
    className: "btn btn-primary btn-lg primaryButton m-2",
    role: "button",
    text: "Přidat recept",
    icon: <FaUtensils className='mb-1 me-2'/>,
    isDisabled: false,
    modalType: '/addRecipe'}
  ];

  useEffect(function loadRecipesOnMount() {
    setIsLoading(true);

    api.get('/recipes')
      .then((response) => {
        setRecipes(response.data);
      })
      .catch(() => {
        setHasError(true);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  // pokud searchValue obsahuje diakritiku (tzn. není stejná jako searchValue bez diakritiky), ...
  if(searchValue !== searchValue.normalize('NFD').replace(/[\u0300-\u036f]/g, "")) {
    //... nenormalizuje = vyhledává jen recepty s diakritikou v názvu (šp -> najde jen špagety), ...
    filteredRecipes = recipes.filter(({ title }) => {
      return title.toLowerCase().includes(searchValue.toLowerCase());
    });
  }
  else {
    //... normalizuje = vyhledává recepty s i bez diakritiky (sp -> najde špagety i spagety)
    filteredRecipes = recipes.filter(({ title }) => {
      return title.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().includes(searchValue.toLowerCase());
    });
  }

  switch(selectedSorting) {
    case "Od Z do A":
      sortedRecipes = filteredRecipes.sort((a, b) => {
        // title, podle které ho filtruje převede na lowerCase a normalizuje tzn. v tomto případě - nahradí všechnu diakritiku, pomocí regexu
        const first = a.title.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
        const second = b.title.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
        if (first < second)
          return 1;
        if (first > second)
          return -1;
        return 0;
      });
      break;

    case "Od nejdelší přípravy":
      // do receptů které mají preparationTime undefined přidá preparationTime: 0, jinak ty recepty byly vypisovány první i při řazení od nejdelšího času
      sortedRecipes = filteredRecipes.map(recipe => recipe.preparationTime ? {...recipe} : { ...recipe, preparationTime: 0 } );
      // seřadí recepty -> (pokud je a a b falsy vrátí 0 | pokud je a falsy vrátí 1 | pokud je b falsy vrátí -1 | pokud je a < b vrátí 1 | pokud je a > b vrátí -1 | jinak vrátí 0)
      sortedRecipes = sortedRecipes.slice().sort(({preparationTime: a}, {preparationTime: b}) => (!a && !b ? 0 : !a ? 1 : !b ? -1 : a < b ? 1 : a > b ? -1 : 0));
      break;

    case "Od nejkratší přípravy":
      // seřadí recepty -> (pokud je a a b falsy vrátí 0 | pokud je a falsy vrátí -1 | pokud je b falsy vrátí 1 | pokud je a < b vrátí -1 | pokud je a > b vrátí 1 | jinak vrátí 0)
      sortedRecipes = filteredRecipes.slice().sort(({preparationTime: a}, {preparationTime: b}) => (!a && !b ? 0 : !a ? -1 : !b ? 1 : a < b ? -1 : a > b ? 1 : 0));
      break;

    default:
      sortedRecipes = filteredRecipes.sort((a, b) => {
        // title, podle které ho filtruje převede na lowerCase a normalizuje tzn. v tomto případě nahradí všechnu diakritiku, pomocí regexu
        const first = a.title.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
        const second = b.title.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
        if (first > second)
          return 1;
        if (first < second)
          return -1;
        return 0;
      });
      break;
  };

  const handleSearchInputChange = ({ target }) => setSearchValue(target.value);

  const toggle = () => setDropdownOpen(prevState => !prevState);

  if(isLoading) {
    return (
      <div className="fixed-top d-flex h-100 w-100 justify-content-center align-items-center">
        <Spinner />
      </div>
    );
  }

  return (
    <Container>
      <HeadingWithButtons headingText="Recepty" buttons={buttonProps} recipesNumber={sortedRecipes.length}></HeadingWithButtons>

      <hr/>

      <Row>
        <Col xxl={9} xl={8} md={7}>
          <SearchInput className="mb-3" onChange={handleSearchInputChange} value={searchValue}/>
        </Col>
        <Col xxl={3} xl={4} md={5}>
          <Dropdown className='mb-3 mb-md-0 mt-0 mt-md-1' isOpen={dropdownOpen} toggle={toggle}>
            <DropdownToggle className='w-100 d-flex justify-content-center align-items-center' color='light'>
              Řazení: <div className='w-100 d-flex justify-content-start align-items-center ms-2'>{selectedSortingIcon} {selectedSorting}</div> { dropdownOpen ? <FaChevronUp className='ms-2'/> : <FaChevronDown className='ms-2'/> }
            </DropdownToggle>
            <DropdownMenu end>
              <DropdownItem onClick={() => { setSelectedSorting(sortStrings[0]); setSelectedSortingIcon(sortStringsIcons[0]); }}>
                <FaSortAlphaDown className='mb-1 me-3'/>{sortStrings[0]}
              </DropdownItem>
              <DropdownItem onClick={() => { setSelectedSorting(sortStrings[1]); setSelectedSortingIcon(sortStringsIcons[1]); }}>
                <FaSortAlphaDownAlt className='mb-1 me-3'/>{sortStrings[1]}
              </DropdownItem>
              <DropdownItem onClick={() => { setSelectedSorting(sortStrings[2]); setSelectedSortingIcon(sortStringsIcons[2]); }}>
                <FaClock className='mb-1 me-3'/>{sortStrings[2]}
              </DropdownItem>
              <DropdownItem onClick={() => { setSelectedSorting(sortStrings[3]); setSelectedSortingIcon(sortStringsIcons[3]); }}>
                <FaRegClock className='mb-1 me-3'/>{sortStrings[3]}
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </Col>
      </Row>

      { hasError && <Alert color="danger">Chyba!</Alert> }

      <RecipesList recipes={sortedRecipes}/>
    </Container>
  );
}
