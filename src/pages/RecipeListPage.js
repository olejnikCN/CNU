//#region Imports
import React, { useEffect, useState } from 'react';
import { Container, Spinner, Row, Col } from 'reactstrap';
import { useNavigate } from 'react-router-dom';
import { FaUtensils } from 'react-icons/fa';

import { api } from '../api';
import { RecipesList } from '../components/Recipes/RecipesList';
import { SearchInput } from '../components/UI/SearchInput';
import { HeadingWithButtons } from '../components/Headings/HeadingWithButtons';
import { RecipesSearch } from '../functions/RecipesSearch';
import { RecipesSorting } from '../functions/RecipesSorting';
import SortingDropdown from '../components/UI/SortingDropdown';
import CustomAlert from '../components/UI/CustomAlert';

import '../components/Headings/HeadingWithButtons.css';

//#endregion

export function RecipeListPage() {
  const [recipes, setRecipes] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const [sortedRecipes, setSortedRecipes] = useState([]);
  const [filteredRecipes, setFilteredRecipes] = useState([]);

  useEffect(function loadRecipesOnMount() {
    setIsLoading(true);

    api
      .get('/recipes')
      .then(response => {
        setRecipes(response.data);
      })
      .catch(() => {
        setHasError(true);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  const navigate = useNavigate();

  const buttonProps = [
    {
      onClickFunc: (isGroup, modalType) => {
        navigate(modalType);
      },
      className: 'btn btn-primary btn-lg primaryButton m-2',
      role: 'button',
      text: 'Přidat recept',
      icon: <FaUtensils className="mb-1 me-2" />,
      isDisabled: false,
      modalType: '/addRecipe',
    },
  ];

  useEffect(() => {
    setFilteredRecipes(RecipesSearch(searchValue, recipes));
  }, [searchValue, recipes]);

  useEffect(() => {
    setSortedRecipes(RecipesSorting(searchValue, filteredRecipes));
  }, [filteredRecipes]);

  const handleSearchInputChange = event => setSearchValue(event.target.value);

  if (isLoading) {
    return (
      <div className="fixed-top d-flex h-100 w-100 justify-content-center align-items-center">
        <Spinner />
      </div>
    );
  }

  return (
    <Container>
      <HeadingWithButtons
        headingText="Recepty"
        buttons={buttonProps}
        recipesNumber={sortedRecipes.length}
        isRecipesList={true}
      />

      <hr />

      <Row>
        <Col xxl={9} xl={8} md={7}>
          <SearchInput
            className="mb-3"
            onChange={handleSearchInputChange}
            value={searchValue}
          />
        </Col>
        <Col xxl={3} xl={4} md={5}>
          <SortingDropdown
            filteredRecipes={filteredRecipes}
            onSortingChange={setSortedRecipes}
          />
        </Col>
      </Row>

      {hasError && (
        <CustomAlert color="danger" text="Nastala nějaká chyba..." />
      )}

      {sortedRecipes.length !== 0 && <RecipesList recipes={sortedRecipes} />}

      {sortedRecipes.length === 0 && (
        <h4>
          <CustomAlert color="warning" text="Nic nebylo nalezeno..." />
        </h4>
      )}
    </Container>
  );
}
