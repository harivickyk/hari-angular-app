import { Action } from "@ngrx/store";
import { Ingredient } from "src/app/shared/ingredient.model";

export const ADD_INGREDIENT = '[Shopping List] ADD_INGREDIENT';
export const ADD_INGREDIENTS = '[Shopping List] ADD_INGREDIENTS';
export const UPDATE_INGREDIENT = '[Shopping List] UPDATE_INGREDIENT';
export const DELETE_INGREDIENT = '[Shopping List] DELETE_INGREDIENT';
export const START_EDIT = '[Shopping List] START_EDIT';
export const STOP_EDIT = '[Shopping List] STOP_EDIT';

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

    constructor(public payload: Ingredient) {}
    
}; 

export class DeleteIngredientReducer implements Action {
    //type safety - prevention from outside this code
    readonly type = DELETE_INGREDIENT;
    
}; 

export class StartEditReducer implements Action {
    readonly type = START_EDIT;

    constructor(public payload: number) {}
}

export class StopEditReducer implements Action {
    readonly type = STOP_EDIT;
}

export type ShoppingListActionTypes = AddIngredientReducer 
| AddIngredientsReducer
| UpdateIngredientReducer
| DeleteIngredientReducer
| StartEditReducer
| StopEditReducer;