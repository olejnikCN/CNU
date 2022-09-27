export const RecipesSearch = (searchValue, recipes) => {
  let filteredRecipes = [];

  // pokud searchValue obsahuje diakritiku (tzn. není stejná jako searchValue bez diakritiky), ...
  if (
    searchValue !== searchValue.normalize('NFD').replace(/[\u0300-\u036f]/g, '')
  ) {
    //... nenormalizuje = vyhledává jen recepty s diakritikou v názvu (šp -> najde jen špagety), ...
    filteredRecipes = recipes.filter(({ title }) => {
      return title.toLowerCase().includes(searchValue.toLowerCase());
    });
  } else {
    //... normalizuje = vyhledává recepty s i bez diakritiky (sp -> najde špagety i spagety)
    filteredRecipes = recipes.filter(({ title }) => {
      return title
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .toLowerCase()
        .includes(searchValue.toLowerCase());
    });
  }

  return filteredRecipes;
};
