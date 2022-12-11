//#region Imports
import React, { useEffect, useState, useContext } from 'react';
import { Container, Row, Col } from 'reactstrap';
import { useNavigate } from 'react-router-dom';
import { FaUtensils } from 'react-icons/fa';

import RecipesList from '../components/Recipes/RecipesList';
import SearchInput from '../components/Inputs/SearchInput';
import HeadingWithButtons from '../components/Headings/HeadingWithButtons';
import SortingDropdown from '../components/Dropdowns/SortingDropdown';
import CustomAlert from '../components/UI/CustomAlert';
import LoadingSpinner from '../components/UI/Spinner';

import { useRecipesSorting } from '../custom-hooks/useRecipesSorting';
import { useRecipesSearch } from '../custom-hooks/useRecipesSearch';
import { SearchContext } from '../context/search-context';

import { api } from '../api';
//#endregion

export default function RecipeListPage() {
  const [recipes, setRecipes] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const [sortingValue, setSortingValue] = useState('');
  const [sortedRecipes, setSortedRecipes] = useState([]);
  const [filteredRecipes, setFilteredRecipes] = useState([]);

  const searchCtx = useContext(SearchContext);

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
    setFilteredRecipes(useRecipesSearch(searchCtx.searchString, recipes));
  }, [searchCtx.searchString, recipes]);

  useEffect(() => {
    setSortedRecipes(useRecipesSorting(sortingValue, filteredRecipes));
  }, [searchCtx.searchString, filteredRecipes]);

  const handleSearchInputChange = value => searchCtx.updateSearchString(value);

  const handleClearInput = () => searchCtx.updateSearchString('');

  const sortingHandler = (sortedRecipes, sortingValue) => {
    setSortedRecipes(sortedRecipes);
    setSortingValue(sortingValue);
  };

  if (isLoading) return <LoadingSpinner />;

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
            onClearButton={handleClearInput}
            onChange={handleSearchInputChange}
            value={searchCtx.searchString}
          />
        </Col>
        <Col xxl={3} xl={4} md={5}>
          <SortingDropdown
            filteredRecipes={filteredRecipes}
            onSortingChange={sortingHandler}
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
