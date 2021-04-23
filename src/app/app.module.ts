import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { RecipesComponent } from './recipes/recipes.component';
import { RecipeDetailComponent } from './recipes/recipe-detail/recipe-detail.component';
import { RecipeListComponent } from './recipes/recipe-list/recipe-list.component';
import { ShoppingListComponent } from './shopping-list/shopping-list.component';
import { ShoppingEditComponent } from './shopping-list/shopping-edit/shopping-edit.component';
import { DropdownDirective } from './shared/dropdown.directive';
<<<<<<< HEAD
import { ShoppingListService } from './shopping-list/shopping-list.service';
import { AppRoutingModule } from './app-routing.module';
import { ReceipeItemComponent } from './recipes/recipe-list/receipe-item/receipe-item.component';
=======
<<<<<<< HEAD
import { ShoppingListService } from './shopping-list/shopping-list.service';
import { AppRoutingModule } from './app-routing.module';
>>>>>>> 2f86865f883910f96d41873c6983979f1fa5485f

=======
import { RecipeService } from './recipes/recipe.service';
import { RecipeItemComponent } from './recipes/recipe-list/recipe-item/recipe-item.component';
>>>>>>> b4d646c7244b08e3c3bb46eeb9b134a7547726e4

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    RecipesComponent,
    RecipeListComponent,
    RecipeDetailComponent,
    ReceipeItemComponent,
    ShoppingListComponent,
    ShoppingEditComponent,
    DropdownDirective
  ],
  imports: [
    BrowserModule, 
    FormsModule, 
    AppRoutingModule
  ],
<<<<<<< HEAD
  providers: [ShoppingListService],
=======
<<<<<<< HEAD
  providers: [ShoppingListService],
=======
  providers: [RecipeService],
>>>>>>> b4d646c7244b08e3c3bb46eeb9b134a7547726e4
>>>>>>> 2f86865f883910f96d41873c6983979f1fa5485f
  bootstrap: [AppComponent]
})
export class AppModule { }
