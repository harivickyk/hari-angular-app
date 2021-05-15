import { Component, OnDestroy, OnInit } from "@angular/core";
import { Store } from "@ngrx/store";
import { Subscription } from "rxjs";
import { AuthService } from "../auth/auth/auth.service";
import { DataStorageService } from "../shared/data-storage.service";
import * as fromApp from 'src/app/store/app.reducer';
import { map } from "rxjs/operators";

@Component({
    selector: 'app-header',
    templateUrl:'./header.component.html'
})

export class HeaderComponent implements OnInit, OnDestroy {
    collapsed = true;
    isAuthenticated = false;
    private userSub!: Subscription;
    

    constructor(private dataStorageService: DataStorageService,
        private authService: AuthService,
        private store: Store<fromApp.AppState>) {}

        ngOnInit(): void {
            // this.userSub = this.authService.user.subscribe(user => {
            //     this.isAuthenticated = !user ? false : true;
            // });

            this.userSub = this.store.select('auth').pipe(map(authState => {
                return authState.user;
            })).subscribe(user => {
                this.isAuthenticated = !user ? false : true;
            });

        }

    onSaveData() {
        this.dataStorageService.storeRecipes();
    }   
    
    onFetchData() {
        this.dataStorageService.fetchRecipes().subscribe();
    }

    onLogOut() {
        this.authService.logOut();
    }

    ngOnDestroy() {
        this.userSub.unsubscribe();
    }
}