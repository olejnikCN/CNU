import { useEffect, useState } from 'react';
import { Container, Spinner, Alert, Button } from 'reactstrap';
import React from 'react';
import { Link } from 'react-router-dom';

import { api } from '../api';
import { RecipesList } from '../components/RecipesList';
import { SearchInput } from '../components/SearchInput';
import '../styles/RecipeListPage.css';

export function RecipeListPage() {
  const [recipes, setRecipes] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [searchValue, setSearchValue] = useState('');

  useEffect(function loadRecipesOnMount() {
    setIsLoading(true);

    api
      .get('/recipes')
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

  const filteredRecipes = recipes.filter(({ title }) => {
    return title.toLowerCase().includes(searchValue.toLowerCase());
  });

  const handleSearchInputChange = ({ target }) => setSearchValue(target.value);

  return (
    <Container>
      <div>
        <h1 className="heading1">Recepty</h1>
        <Link to="/addRecipe" className="btn btn-primary primaryButton">
          <b>+</b> Přidat recept
        </Link>
      </div>

      <SearchInput
        className="mb-3"
        onChange={handleSearchInputChange}
        value={searchValue}
      />

      {isLoading && <Spinner />}

      {hasError && <Alert color="danger">Chyba!</Alert>}

      <RecipesList recipes={filteredRecipes} />
    </Container>
  );
}
