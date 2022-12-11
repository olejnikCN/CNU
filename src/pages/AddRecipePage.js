import { React } from 'react';

import { AddUpdateRecipePage } from '../components/Recipes/AddUpdateRecipe';

export default function AddRecipePage() {
  return <AddUpdateRecipePage apiEndpoint="/recipes" />;
}
