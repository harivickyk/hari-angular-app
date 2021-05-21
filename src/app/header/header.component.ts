import { Component, OnDestroy, OnInit } from "@angular/core";
import { Store } from "@ngrx/store";
import { Subscription } from "rxjs";
import { AuthService } from "../auth/auth/auth.service";
import { DataStorageService } from "../shared/data-storage.service";
import * as fromApp from 'src/app/store/app.reducer';
import { map } from "rxjs/operators";
import * as AuthActions from 'src/app/auth/store/auth.action';
import * as RecipesActions from 'src/app/recipes/store/recipe.action';
import { TranslateService } from "@ngx-translate/core";

@Component({
    selector: 'app-header',
    templateUrl:'./header.component.html'
})

export class HeaderComponent implements OnInit, OnDestroy {
    collapsed = true;
    isAuthenticated = false;
    translated = false;
    private userSub!: Subscription;


    constructor(private dataStorageService: DataStorageService,
        private authService: AuthService,
        private store: Store<fromApp.AppState>,
        private translate: TranslateService) {}

        ngOnInit(): void {
            // this.userSub = this.authService.user.subscribe(user => {
            //     this.isAuthenticated = !user ? false : true;
            // });

            this.translate.use('en');
            this.translated = false;

            this.userSub = this.store.select('auth').pipe(map(authState => {
                return authState.user;
            })).subscribe(user => {
                this.isAuthenticated = !user ? false : true;
            });

        }

    onSaveData() {
        //this.dataStorageService.storeRecipes();

        this.store.dispatch(new RecipesActions.StoreRecipes);
    }

    onFetchData() {
        //this.dataStorageService.fetchRecipes().subscribe();

        this.store.dispatch(new RecipesActions.FetchRecipes);
    }

    onLogOut() {
        //this.authService.logOut();

        this.store.dispatch(new AuthActions.Logout);
    }

    ngOnDestroy() {
        this.userSub.unsubscribe();
    }

    translateTo() {
      if(!this.translated) {
        this.translate.use('ta');
        this.translated = true;
      }
      else {
        this.translate.use('en');
        this.translated = false;
      }
    }
}
