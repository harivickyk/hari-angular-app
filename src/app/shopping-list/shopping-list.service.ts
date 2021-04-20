import { EventEmitter } from "@angular/core";
import { Ingredient } from "../shared/ingredient.model";

export class ShoppingListService {

    ingChanged = new EventEmitter<Ingredient[]>();

    private ingredients: Ingredient[]  = [ 
        new Ingredient('Apples', 5),
        new Ingredient('Tomatoe', 15)
      ];


    getIngredients() {
        return this.ingredients.slice();
    }

    addIngredient(ingredient: Ingredient) {
        this.ingredients.push(ingredient);
        this.ingChanged.emit(this.ingredients.slice());
      }

      addIngredients(ingredients: Ingredient[]) {
        this.ingredients.push(...ingredients);
        this.ingChanged.emit(this.ingredients.slice());
      }

      // for (let ingredient of ingredients) {
        //   this.addIngredient(ingredient);
        // }
}