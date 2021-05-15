import { NgModule } from "@angular/core";
import { PreloadAllModules, RouterModule, Routes } from "@angular/router";
import { RecipesComponent } from "./recipes/recipes.component";

const appRoutes: Routes = [
    {
        path: '',
        redirectTo: '/recipes',
        pathMatch: 'full'
    },
    {
        path: 'recipes', //lazy-loading
        loadChildren: () => import('./recipes/recipe.module').then(m => m.RecipeModule)
    },
    {
        path: 'shopping-list',
        loadChildren: () => import('./shopping-list/shopping-list.module').then(m => m.ShoppingListMoudle)
    },
    {
        path: 'auth',
        loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)
    },
    {
        path: '**', 
        component: RecipesComponent
    }
]

@NgModule({
    imports: [RouterModule.forRoot(appRoutes, {
    preloadingStrategy: PreloadAllModules,
    initialNavigation: 'enabled'
})],
    exports: [RouterModule]

})

export class AppRoutingModule {

}