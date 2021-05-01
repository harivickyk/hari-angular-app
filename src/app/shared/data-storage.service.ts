import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Recipe } from "../recipes/recipe.model";
import { RecipeService } from "../recipes/recipe.service";
import { map, tap } from 'rxjs/operators';
import { AuthService } from "../auth/auth/auth.service";

@Injectable()
export class DataStorageService {

    constructor(private http: HttpClient,
        private recipeService: RecipeService,
        private authService: AuthService) {}

    storeRecipes() {
        const recipes = this.recipeService.getRecipes();
        this.http
        .put('https://hari-angular-dev-default-rtdb.firebaseio.com/recipes.json'
        , recipes)
        .subscribe(response => {
            console.log(response);
        });
    }

    fetchRecipes() {
        console.log('Reached Fetch Recipes');
        return this.http
        .get<Recipe[]>('https://hari-angular-dev-default-rtdb.firebaseio.com/recipes.json')
        .pipe(map(recipes => {
            return recipes.map(recipe => {
                return {...recipe, ingredients: recipe.ingredients ? recipe.ingredients : []}
            })
        }), 
        tap(response => {
            this.recipeService.setRecipes(response);
        }));
    }
}