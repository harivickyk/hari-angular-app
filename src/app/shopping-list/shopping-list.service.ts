import { Ingredient } from "../shared/ingredient.model";
import { Subject } from "rxjs";

export class ShoppingListService {

    ingChanged = new Subject<Ingredient[]>();

    private ingredients: Ingredient[]  = [ 
        new Ingredient('Apples', 5),
        new Ingredient('Tomatoe', 15)
      ];


    getIngredients() {
        return this.ingredients.slice();
    }

    addIngredient(ingredient: Ingredient) {
        this.ingredients.push(ingredient);
        this.ingChanged.next(this.ingredients.slice());
      }

      addIngredients(ingredients: Ingredient[]) {
        this.ingredients.push(...ingredients);
        this.ingChanged.next(this.ingredients.slice());
      }
}