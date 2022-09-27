import { React } from 'react';

import { AddUpdateRecipePage } from '../components/Recipes/AddUpdateRecipe';

export function AddRecipePage() {
  return <AddUpdateRecipePage apiEndpoint={'/recipes'} />;
}
