import { EventEmitter } from "@angular/core";
import { Recipe } from "./recipe.model";

export class RecipeService {
    recipeSelected = new EventEmitter<Recipe>();

    private recipes: Recipe[] = [
        new Recipe('Recipe A', 
        'Description of Recipe A', 
        'https://images.immediate.co.uk/production/volatile/sites/30/2020/08/chorizo-scotch-quails-eggs-5177019.jpg?webp=true&quality=90&resize=440%2C400')
      ];

      getRecipes() {
          return this.recipes.slice();
      }
}