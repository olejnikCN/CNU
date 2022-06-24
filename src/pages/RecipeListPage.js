import { useEffect, useState } from 'react';
import { Container, Spinner, Alert } from 'reactstrap';

import { api } from '../api';
import { RecipesList } from '../components/RecipesList';
import { SearchInput } from '../components/SearchInput';


export function RecipeListPage() {
  const [recipes, setRecipes] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [searchValue, setSearchValue] = useState('');


  useEffect(function loadRecipesOnMount() {
    setIsLoading(true);

    api
      .get('/recipes')
      .then(( response => {
        setRecipes(response.data);
      }))
      .catch(() => {
        setHasError(true);
      })
      .finally(() => {
        setIsLoading(false);
      });
    }, [] );

    const filteredRecipes = recipes.filter(( { title } ) => {
      return title.toLowerCase().includes(searchValue.toLowerCase());
    })

    const handleSearchInputChange = ({ target }) => setSearchValue(target.value);

  return (
    <Container>

      <h1>Recepty</h1>

      <SearchInput className='mb-3' onChange={handleSearchInputChange} value={searchValue} />

      {isLoading && <Spinner />}

      {hasError && <Alert color='danger'>Chyba!</Alert>}

      <RecipesList recipes={filteredRecipes}/>

    </Container>
  );
}
