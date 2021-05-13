import { Action } from "@ngrx/store";
import { Ingredient } from "src/app/shared/ingredient.model";

export const ADD_INGREDIENT = 'ADD_INGREDIENT';
export const ADD_INGREDIENTS = 'ADD_INGREDIENTS';
export const UPDATE_INGREDIENT = 'UPDATE_INGREDIENT';
export const DELETE_INGREDIENT = 'DELETE_INGREDIENT';

export class AddIngredientReducer implements Action {
    //type safety - prevention from outside this code
    readonly type = ADD_INGREDIENT;

    constructor(public payload: Ingredient) {}
    
}; 

export class AddIngredientsReducer implements Action {
    readonly type = ADD_INGREDIENTS;

    constructor(public payload: Ingredient[]) {}

}

export class UpdateIngredientReducer implements Action {
    //type safety - prevention from outside this code
    readonly type = UPDATE_INGREDIENT;

    constructor(public payload: {index: number, ingredient: Ingredient}) {}
    
}; 

export class DeleteIngredientReducer implements Action {
    //type safety - prevention from outside this code
    readonly type = DELETE_INGREDIENT;

    constructor(public payload: number) {}
    
}; 

export type ShoppingListActionTypes = AddIngredientReducer 
| AddIngredientsReducer
| UpdateIngredientReducer
| DeleteIngredientReducer;