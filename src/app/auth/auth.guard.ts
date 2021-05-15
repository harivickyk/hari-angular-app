import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Store } from "@ngrx/store";
import { Observable } from "rxjs";
import { map, take, tap } from "rxjs/operators";
import { AuthService } from "./auth/auth.service";
import * as fromApp from 'src/app/store/app.reducer';

@Injectable( {
    providedIn: 'root'
})

export class AuthGuardService implements CanActivate {

    constructor(private authService: AuthService, 
        private router: Router,
        private store: Store<fromApp.AppState>) {}

    canActivate(route: ActivatedRouteSnapshot,
        routerState: RouterStateSnapshot) : 
        boolean 
        | UrlTree 
        | Promise<boolean 
        | UrlTree> | Observable<boolean | UrlTree> {
            return this.store.select('auth').pipe( //this.authService.user.pipe(
                take(1),
                map(authState => {
                    return authState.user;
                }),
                map(user => {
                    const isAuth = !!user;
                    if(isAuth) {
                        return true;
                    }
                    return this.router.createUrlTree(['/auth']);
                })
            );
        }

}