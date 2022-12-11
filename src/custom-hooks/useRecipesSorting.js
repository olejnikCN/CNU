export const useRecipesSorting = (selectedSorting, filteredRecipes) => {
  let sortedRecipes = [];

  switch (selectedSorting) {
    // title, podle které ho filtruje převede na lowerCase a normalizuje
    // tzn. v tomto případě - nahradí všechnu diakritiku, pomocí regexu
    case 'Od Z do A':
      sortedRecipes = filteredRecipes.sort((a, b) => {
        const first = a.title
          .toLowerCase()
          .normalize('NFD')
          .replace(/[\u0300-\u036f]/g, '');
        const second = b.title
          .toLowerCase()
          .normalize('NFD')
          .replace(/[\u0300-\u036f]/g, '');
        if (first < second) return 1;
        if (first > second) return -1;
        return 0;
      });
      break;

    // seřadí recepty -> (pokud je a a b falsy vrátí 0 | pokud je a falsy vrátí 1
    // | pokud je b falsy vrátí -1 | pokud je a < b vrátí 1 | pokud je a > b vrátí -1 | jinak vrátí 0)
    case 'Od nejdelší přípravy':
      // do receptů které mají preparationTime undefined přidá preparationTime: 0,
      // jinak ty recepty byly vypisovány první i při řazení od nejdelšího času
      sortedRecipes = filteredRecipes.map(recipe =>
        recipe.preparationTime
          ? { ...recipe }
          : { ...recipe, preparationTime: 0 },
      );
      sortedRecipes = sortedRecipes
        .slice()
        .sort(({ preparationTime: a }, { preparationTime: b }) =>
          !a && !b ? 0 : !a ? 1 : !b ? -1 : a < b ? 1 : a > b ? -1 : 0,
        );
      break;

    // seřadí recepty -> (pokud je a a b falsy vrátí 0 | pokud je a falsy vrátí -1
    // | pokud je b falsy vrátí 1 | pokud je a < b vrátí -1 | pokud je a > b vrátí 1 | jinak vrátí 0)
    case 'Od nejkratší přípravy':
      sortedRecipes = filteredRecipes
        .slice()
        .sort(({ preparationTime: a }, { preparationTime: b }) =>
          !a && !b ? 0 : !a ? -1 : !b ? 1 : a < b ? -1 : a > b ? 1 : 0,
        );
      break;

    // title, podle které ho filtruje převede na lowerCase a normalizuje
    // tzn. v tomto případě nahradí všechnu diakritiku, pomocí regexu
    default:
      sortedRecipes = filteredRecipes.sort((a, b) => {
        const first = a.title
          .toLowerCase()
          .normalize('NFD')
          .replace(/[\u0300-\u036f]/g, '');
        const second = b.title
          .toLowerCase()
          .normalize('NFD')
          .replace(/[\u0300-\u036f]/g, '');
        if (first > second) return 1;
        if (first < second) return -1;
        return 0;
      });
      break;
  }

  return sortedRecipes;
};
