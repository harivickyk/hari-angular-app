import { HttpClient, HttpErrorResponse, HttpResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Store } from "@ngrx/store";
import { BehaviorSubject, throwError } from "rxjs";
import { catchError, tap } from "rxjs/operators";
import { environment } from "src/environments/environment";
import { User } from "./user.model";
import * as fromApp from 'src/app/store/app.reducer';
import * as AuthActions from '../store/auth.action';

export interface AuthResponseData {
    idToken: string,
    email: string,
    refreshToken: string,
    expiresIn: string,
    localId: string,
    registered?: boolean
}

@Injectable()
export class AuthService {

    //Disabled StrictMode to make this shit work
    //Need to investigate this to make this work with strict mode

    //user = new BehaviorSubject<User>(null);
    
    private _tokenExpirationDatetimer: any;
    
    constructor(private http: HttpClient,
        private router: Router,
        private store: Store<fromApp.AppState>) {}
    
    signUp(email: string, password: string) {
        return this.http
        .post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=' + environment.firebaseAPIKey,
        {
            email: email,
            password: password,
            returnSecureToken: true
            
        })
        .pipe(
            catchError(this.handleError),
            tap(responseData => {
                this.handleAuthentication(responseData.email,
                    responseData.localId, 
                    responseData.idToken,
                    +responseData.expiresIn)
            })
        );
    }

    login(email: string, password: string) {
        return this.http
        .post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=' + environment.firebaseAPIKey, {
            email: email,
            password: password,
            returnSecureToken: true
        })
        .pipe(
            catchError(this.handleError),
            tap(responseData => {
                this.handleAuthentication(responseData.email,
                    responseData.localId, 
                    responseData.idToken,
                    +responseData.expiresIn)
            })
        );
    }

    logOut() {
        //this.user.next(null);

        this.store.dispatch(new AuthActions.Logout());

        this.router.navigate(['/auth']);
        localStorage.removeItem('userData');
        if(this._tokenExpirationDatetimer) {
            clearTimeout(this._tokenExpirationDatetimer);
        }
        this._tokenExpirationDatetimer = null;
    }

    autoLogin() {
        const userData:{
            email: string,
            id: string,
            _token: string,
            _tokenExpirationDate: Date
        } = JSON.parse(localStorage.getItem('userData'));

        if(!userData){
            return;
        }

        const loadedUser = new User(userData.email, 
            userData.id, 
            userData._token, 
            new Date(userData._tokenExpirationDate));
            
        //setter method - kind of
        //this will be true if token did not expire
        //while user object creation
        if(!loadedUser.token){
            //this.user.next(loadedUser);

            this.store.dispatch(new AuthActions.Login({
                email: loadedUser.email,
                userId: loadedUser.id,
                token: loadedUser.token,
                expiryDate: new Date(userData._tokenExpirationDate)
            }))

            const expTimer = new Date(userData._tokenExpirationDate).getTime() - new Date().getTime();
            this.autoLogOut(expTimer);
        }
    }

    autoLogOut(expirationDuration: number) {
        this._tokenExpirationDatetimer = setTimeout(() => {
            this.logOut
        }, expirationDuration);

    }

    private handleAuthentication(email: string, userid: string, token: string, expiresIn: number) {
        const expDate = new Date(new Date().getTime() + expiresIn * 1000);
        const user = new User(
            email, 
            userid, 
            token, 
            expDate);
        //this.user.next(user);
        this.store.dispatch(new AuthActions.Login({
            email: email,
            userId: userid,
            token: token,
            expiryDate: expDate
        }))
        this.autoLogOut(expiresIn * 1000);
        localStorage.setItem('userData', JSON.stringify(user));
    }

    private handleError(errorResponse: HttpErrorResponse) {
        console.log(errorResponse);
        let errMsg = 'An unknown error occured';
            if(!errorResponse.error || !errorResponse.error.error){
                return throwError(errMsg);
            }
            switch(errorResponse.error.error.message){
                case 'EMAIL_EXISTS':
                    errMsg = 'This email already exists';
                    break;
                case 'EMAIL_NOT_FOUND':
                    errMsg = 'This email is not found';
                    break;
                case 'INVALID_PASSWORD':
                    errMsg = 'Entered Password is incorrect';
                    break;
            }
            return throwError(errMsg);
    }
}