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

  let filteredRecipes = [];

  if(searchValue !== searchValue.normalize('NFD').replace(/[\u0300-\u036f]/g, "")) {
    filteredRecipes = recipes.filter(({ title }) => {
      return title.toLowerCase().includes(searchValue.toLowerCase());
    });
  }
  else {
    filteredRecipes = recipes.filter(({ title }) => {
      return title.normalize("NFD").replace(/[\u0300-\u036f]/g, "")
                    .toLowerCase().includes(searchValue.toLowerCase());
    });
  }

  let sortedRecipes = [];

  switch(selectedSorting) {
    case "Od Z do A":
      sortedRecipes = filteredRecipes.sort((a, b) => {
        const first = a.title.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
        const second = b.title.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
        if (first < second) {
          return 1;
        }
        if (first > second) {
          return -1;
        }
        return 0;
      });
      break;
    case "Od nejdelší přípravy":
      sortedRecipes = filteredRecipes.sort((a, b) => b.preparationTime - a.preparationTime);
      break;
    case "Od nejkratší přípravy":
      sortedRecipes = filteredRecipes.sort((a, b) => a.preparationTime - b.preparationTime);
      break;
    default:
      sortedRecipes = filteredRecipes.sort((a, b) => {
        const first = a.title.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
        const second = b.title.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
        if (first > second) {
          return 1;
        }
        if (first < second) {
          return -1;
        }
        return 0;
      });
      break;
  };

  const handleSearchInputChange = ({ target }) => setSearchValue(target.value);

  const navigate = useNavigate();

  const toggle = () => setDropdownOpen(prevState => !prevState);

  const buttonProps = [
    { onClickFunc: ((isGroup, modalType) => { navigate(modalType); }), className: "btn btn-primary btn-lg primaryButton m-2", role: "button", text: "Přidat recept",
      icon: <FaUtensils className='mb-1 me-2'/>, isDisabled: false, modalType: '/addRecipe'}
  ];

  if(isLoading) {
    return (
      <div className="fixed-top d-flex h-100 w-100 justify-content-center align-items-center">
        <Spinner />
      </div>
    );
  }

  const sortStrings = ["Od A do Z", "Od Z do A", "Od nejdelší přípravy", "Od nejkratší přípravy"];

  return (
    <Container>
      <HeadingWithButtons headingText="Recepty" buttons={buttonProps}></HeadingWithButtons>

      <hr/>

      <Row>
        <Col xl={9} lg={8} md={7}>
          <SearchInput className="mb-3" onChange={handleSearchInputChange} value={searchValue}/>
        </Col>
        <Col xl={3} lg={4} md={5}>
          <Dropdown className='mb-3 mb-md-0 mt-0 mt-md-1' isOpen={dropdownOpen} toggle={toggle}>
            <DropdownToggle className='w-100 d-flex justify-content-between align-items-center' color='light'>
              Řazení: {selectedSorting} { dropdownOpen ? <FaChevronUp className='ms-2'/> : <FaChevronDown className='ms-2'/> }
            </DropdownToggle>
            <DropdownMenu end>
              <DropdownItem onClick={() => {setSelectedSorting(sortStrings[0]);}}>
                <FaSortAlphaDown className='mb-1 me-3'/>{sortStrings[0]}
              </DropdownItem>
              <DropdownItem onClick={() => {setSelectedSorting(sortStrings[1]);}}>
                <FaSortAlphaDownAlt className='mb-1 me-3'/>{sortStrings[1]}
              </DropdownItem>
              <DropdownItem onClick={() => {setSelectedSorting(sortStrings[2]);}}>
                <FaClock className='mb-1 me-3'/>{sortStrings[2]}
              </DropdownItem>
              <DropdownItem onClick={() => {setSelectedSorting(sortStrings[3]);}}>
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
