
import { Ingredient } from "src/app/shared/ingredient.model";
import  * as ShoppingListActions from "./shopping-list.actions";

export interface State {
    ingredients: Ingredient[];
    editedIngredient: Ingredient;
    editedIngredientIndex: number;
}

const initialState: State = {
    ingredients: [ 
    new Ingredient('Apples', 5),
    new Ingredient('Tomatoe', 15)
  ],
  editedIngredient: null,
  editedIngredientIndex: -1
};

//new javascript function. setting default value like c#
//ngRx make sure that state is immutable (do not update existing state)
//always creates new state

export function shoppingListReducer(
    state = initialState, 
    action: ShoppingListActions.ShoppingListActionTypes) {
        
    switch(action.type) {
        case ShoppingListActions.ADD_INGREDIENT:
            return {
                ...state,
                ingredients: [...state.ingredients, action.payload]
            };

        case ShoppingListActions.ADD_INGREDIENTS:
            return {
                ...state,
                ingredients: [...state.ingredients, ...action.payload]
            };

        case ShoppingListActions.UPDATE_INGREDIENT:

            /*it really is a good pattern that will prevent unexpected 
            bugs where you accidentally edit some old
            state too early and therefore, your @ngrx/store state 
            gets out of sync with your rest of the application state
            that doesn't expect such immutable mutations.
            So therefore, always edit your data immutability like we do it here, 
            return a new state */

            const ing = state.ingredients[state.editedIngredientIndex];
            const updatedIng = {
                ...ing,
                ...action.payload

            };

            const updatedIngredients = [...state.ingredients];
            updatedIngredients[state.editedIngredientIndex] = updatedIng;

            return {
                ...state,
                ingredients: updatedIngredients,
                editedIngredient: null,
                editedIngredientIndex: -1
            };

        case ShoppingListActions.DELETE_INGREDIENT:
            return {
                ...state,
                ingredients: state.ingredients.filter((ig, igIndex) => {
                    return igIndex !== state.editedIngredientIndex
                }),
                editedIngredient: null,
                editedIngredientIndex: -1
            };

        case ShoppingListActions.START_EDIT:
            return {
                ...state,
                editedIngredientIndex: action.payload,
                editedIngredient: {
                    ...state.ingredients[action.payload]
                }
            };
        
        case ShoppingListActions.STOP_EDIT:
            return {
                ...state,
                editedIngredient: null,
                editedIngredientIndex: -1

            };

        default:
            return state;
    }
}