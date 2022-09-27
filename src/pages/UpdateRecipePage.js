import { React } from 'react';
import { useParams } from 'react-router-dom';

import { AddUpdateRecipePage } from '../components/Recipes/AddUpdateRecipe';

export function UpdateRecipePage() {
  const { _id } = useParams();

  return <AddUpdateRecipePage _id={_id} apiEndpoint={`/recipes/${_id}`} />;
}
