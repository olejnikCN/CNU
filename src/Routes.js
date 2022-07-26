import { Routes as RouterRoutes, Route } from 'react-router-dom';

import { RecipeListPage } from './pages/RecipeListPage';
import { NotFoundPage } from './pages/NotFoundPage';
import { RecipeDetailPage } from './pages/RecipeDetailPage';
import { AddRecipePage } from './pages/AddRecipePage';
import { UpdateRecipePage } from './pages/UpdateRecipePage';

export function Routes() {
  return (
      <RouterRoutes>
        <Route index element={<RecipeListPage />}/>
        <Route path="/recipe/:slug" element={<RecipeDetailPage />} />
        <Route path="/addRecipe" element={<AddRecipePage />} />
        <Route path="*" element={<NotFoundPage />} />
        <Route path="/updateRecipe/:_id" element={<UpdateRecipePage />} />
      </RouterRoutes>
  );
}
