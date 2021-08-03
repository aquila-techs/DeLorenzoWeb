import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddRecipeComponent } from "./add-recipe/add-recipe.component";
import { AllRecipesComponent } from "./all-recipes/all-recipes.component";
import { RecipeDetailComponent } from "./recipe-detail/recipe-detail.component";
import * as english from "../shared/translation/english";
import * as dutch from "../shared/translation/dutch";

const language = localStorage.getItem("language");

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'addrecipe',
        component: AddRecipeComponent,
        data: {
          title: `${language === "English" ? english.add_recipe : dutch.add_recipe}`,
          urls: [
            { title: 'Dashboard', url: '/' },
            { title: `${language === "English" ? english.add_recipe : dutch.add_recipe}` }
          ]
        }
      },
      {
        path: 'all',
        component: AllRecipesComponent,
        data: {
          title: `${language === "English" ? english.all_recipes : dutch.all_recipes}`,
          urls: [
            { title: 'Dashboard', url: '/' },
            { title: `${language === "English" ? english.all_recipes : dutch.all_recipes}` }
          ]
        }
      },
      {
        path: 'detail/:recipeId',
        component: RecipeDetailComponent,
        data: {
          title: `${language === "English" ? english.recipe : dutch.recipe}`,
          urls: [
            { title: `${language === "English" ? english.all_recipes : dutch.all_recipes}`, url: '/recipes/all' },
            { title: `${language === "English" ? english.recipe : dutch.recipe}` }
          ]
        }
      },
   ]
 }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RecipeRoutingModule { }
