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

  let filteredRecipes= [];

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

  const handleSearchInputChange = ({ target }) => setSearchValue(target.value);

  const navigate = useNavigate();

  const toggle = () => setDropdownOpen(prevState => !prevState);

  const buttonProps = [
    { onClickFunc: ((isGroup, modalType) => { navigate(modalType); }), className: "btn btn-lg primaryButton m-2", role: "button", text: "Přidat recept", btnColor: "primary",
      icon: <FaUtensils className='mb-1 me-2'/>, isDisabled: false, modalType: '/addRecipe'}
  ];

  if(isLoading) {
    return (
      <div className="fixed-top d-flex h-100 w-100 justify-content-center align-items-center">
        <Spinner />
      </div>
    );
  }

  return (
    <Container>

      <HeadingWithButtons headingText="Recepty" buttons={buttonProps}></HeadingWithButtons>

      <hr/>

      <Row>
        <Col lg={10}>
          <SearchInput className="mb-3" onChange={handleSearchInputChange} value={searchValue}/>
        </Col>
        <Col lg={2}>
        <div>
          <Dropdown isOpen={dropdownOpen} toggle={toggle}>
            <DropdownToggle size='lg' className='w-100 d-flex justify-content-between align-items-center' color='secondary'>
              Řazení { dropdownOpen ? <FaChevronUp className='ms-2'/> : <FaChevronDown className='ms-2'/> }
            </DropdownToggle>
            <DropdownMenu>
              <DropdownItem header>Podle názvu</DropdownItem>
              <DropdownItem><FaSortAlphaDown className='mb-1 me-3'/>Od A do Z</DropdownItem>
              <DropdownItem><FaSortAlphaDownAlt className='mb-1 me-3'/>Od Z do A</DropdownItem>
              <DropdownItem header>Podle délky přípravy</DropdownItem>
              <DropdownItem><FaClock className='mb-1 me-3'/>Od nejdelší</DropdownItem>
              <DropdownItem><FaRegClock className='mb-1 me-3'/>Od nejkratší</DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </div>
        </Col>
      </Row>


      { hasError && <Alert color="danger">Chyba!</Alert> }

      <RecipesList recipes={filteredRecipes}/>

    </Container>
  );

}
