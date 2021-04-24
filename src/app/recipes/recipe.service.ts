import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { Ingredient } from "../shared/ingredient.model";
import { ShoppingListService } from "../shopping-list/shopping-list.service";
import { Recipe } from "./recipe.model";

@Injectable()
export class RecipeService {
    recipeSelected = new Subject<Recipe>();

    private recipes: Recipe[] = [
        new Recipe(
            'Recipe A', 
        'Description of Recipe A', 
        'https://images.immediate.co.uk/production/volatile/sites/30/2020/08/chorizo-scotch-quails-eggs-5177019.jpg?webp=true&quality=90&resize=440%2C400', 
        [
            new Ingredient('Meat', 1),
            new Ingredient('Spice', 1)
        ]),
        new Recipe('Big Fat Burger',
        'What else you need to say?',
        'https://upload.wikimedia.org/wikipedia/commons/b/be/Burger_King_Angus_Bacon_%26_Cheese_Steak_Burger.jpg',
        [
            new Ingredient('Buns', 2),
            new Ingredient('Meat', 1)
        ])
      ];

      constructor(private slService: ShoppingListService) {}

      getRecipes() {
          return this.recipes.slice();
      }

      getRecipeById(index: number) {
          return this.recipes[index];
      }

      addIngredientsToShoppingList(ingredients: Ingredient[]) {
        this.slService.addIngredients(ingredients);
      }
}