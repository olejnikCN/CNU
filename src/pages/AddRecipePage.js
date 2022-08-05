import { React } from 'react';

import { AddUpdateRecipePage } from '../components/AddUpdateRecipe';

export function AddRecipePage() {
  return (
    <AddUpdateRecipePage
      recipe={{}}
      apiEndpoint={'/recipes'}
    ></AddUpdateRecipePage>
  );
}
