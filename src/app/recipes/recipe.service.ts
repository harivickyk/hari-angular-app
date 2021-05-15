import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import { Subject } from "rxjs";
import { Ingredient } from "../shared/ingredient.model";
import { Recipe } from "./recipe.model";
import * as ShoppingListActions from '../shopping-list/store/shopping-list.actions';
import * as fromApp from '../store/app.reducer';

@Injectable()
export class RecipeService {
    recipeChanged = new Subject<Recipe[]>();
    recipeSelected = new Subject<Recipe>();

    private recipes: Recipe[] = [];

    constructor(private store: Store<fromApp.AppState>) {}

    setRecipes(recipes: Recipe[]) {
      this.recipes = recipes;
      this.recipeChanged.next(this.recipes.slice());
    }

    getRecipes() {
        return this.recipes.slice();
    }

    getRecipeById(index: number) {
        return this.recipes[index];
    }

    addIngredientsToShoppingList(ingredients: Ingredient[]) {
      //this.slService.addIngredients(ingredients);

      this.store.dispatch(new ShoppingListActions.AddIngredientsReducer(ingredients));
    }

    addRecipe(recipe: Recipe) {
      this.recipes.push(recipe);
      this.recipeChanged.next(this.recipes.slice());
    }

    updateRecipe(index: number, newRecipe: Recipe) {
      this.recipes[index] = newRecipe;
      this.recipeChanged.next(this.recipes.slice());
    }

    deleteRecipe(index: number) {
      this.recipes.splice(index, 1);
      this.recipeChanged.next(this.recipes.slice());
    }
}