import { NgModule } from "@angular/core";
import { HTTP_INTERCEPTORS } from "@angular/common/http";

import { AuthInterceptorService } from "./auth/auth/auth-interceptor";
import { AuthService } from "./auth/auth/auth.service";
import { RecipeService } from "./recipes/recipe.service";

@NgModule({
    providers: [
        RecipeService,
        AuthService,
        {
            provide: HTTP_INTERCEPTORS,
            useClass: AuthInterceptorService,
            multi: true
        }
    ]
})

export class CoreModule {}