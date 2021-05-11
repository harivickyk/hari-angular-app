import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { SharedModule } from "../shared/shared.module";

import { RecipeDetailComponent } from "./recipe-detail/recipe-detail.component";
import { RecipeEditComponent } from "./recipe-edit/recipe-edit.component";
import { ReceipeItemComponent } from "./recipe-list/receipe-item/receipe-item.component";
import { RecipeListComponent } from "./recipe-list/recipe-list.component";
import { RecipeRouteModule } from "./recipe-routing.module";
import { RecipeStartComponent } from "./recipe-start/recipe-start.component";
import { RecipesComponent } from "./recipes.component";

@NgModule({
    declarations: [
        RecipesComponent,
        RecipeListComponent,
        RecipeDetailComponent,
        ReceipeItemComponent,
        RecipeStartComponent,
        RecipeEditComponent
    ],
    imports: [
        RouterModule,
        SharedModule,
        ReactiveFormsModule,
        RecipeRouteModule
    ]
})

export class RecipeModule {}