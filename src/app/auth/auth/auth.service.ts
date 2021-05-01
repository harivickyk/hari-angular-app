import { HttpClient, HttpErrorResponse, HttpResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Subject, throwError } from "rxjs";
import { catchError, tap } from "rxjs/operators";
import { User } from "./user.model";

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

    user = new Subject<User>();

    constructor(private http: HttpClient) {}
    
    signUp(email: string, password: string) {
        return this.http
        .post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyD-V0XgBgY5QtaiWjlqH63qjphfJWy_yAs',
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
        .post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyD-V0XgBgY5QtaiWjlqH63qjphfJWy_yAs', {
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

    private handleAuthentication(email: string, userid: string, token: string, expiresIn: number) {
        const expDate = new Date(new Date().getTime() + expiresIn * 1000);
        const user = new User(
            email, 
            userid, 
            token, 
            expDate);
        this.user.next(user);
    }

    private handleError(errorResponse: HttpErrorResponse) {
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