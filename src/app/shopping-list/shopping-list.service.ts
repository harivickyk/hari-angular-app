import { Ingredient } from "../shared/ingredient.model";
import { Subject } from "rxjs";

export class ShoppingListService {

    ingChanged = new Subject<Ingredient[]>();
    startedEditing = new Subject<number>();

    private ingredients: Ingredient[]  = [ 
        new Ingredient('Apples', 5),
        new Ingredient('Tomatoe', 15)
      ];


    getIngredients() {
        return this.ingredients.slice();
    }

    getIngredient(index: number) {
      return this.ingredients[index];
    }

    addIngredient(ingredient: Ingredient) {
        this.ingredients.push(ingredient);
        this.ingChanged.next(this.ingredients.slice());
      }

    addIngredients(ingredients: Ingredient[]) {
      this.ingredients.push(...ingredients);
      this.ingChanged.next(this.ingredients.slice());
    }

    updateIngredient(index: number, newIng: Ingredient) {
      this.ingredients[index] = newIng;
      this.ingChanged.next(this.ingredients.slice());
    }

    deleteIngredient(index: number) {
      this.ingredients.splice(index, 1);
      this.ingChanged.next(this.ingredients.slice());
    }
  
}