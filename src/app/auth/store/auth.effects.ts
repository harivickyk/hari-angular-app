import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { AuthService } from '../auth/auth.service';
import { User } from '../auth/user.model';
import * as AuthActions from './auth.action';

export interface AuthResponseData {
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: boolean;
}

const handleAuthentication = (
  email: string,
  localId: string,
  idToken: string,
  expiresIn: number
) => {
  const expDate = new Date(new Date().getTime() + expiresIn * 1000);
  const user = new User(email, localId, idToken, expDate);
  localStorage.setItem('userData', JSON.stringify(user));
  return new AuthActions.Login({
    email: email,
    userId: localId,
    token: idToken,
    expiryDate: expDate,
  });
};

const handleError = (errorResponse: any) => {
  let errMsg = 'An unknown error occured';
  if (!errorResponse.error || !errorResponse.error.error) {
    return of(new AuthActions.LoginFail(errMsg));
  }
  switch (errorResponse.error.error.message) {
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
  return of(new AuthActions.LoginFail(errMsg));
};

/*Actions is one big observable that will give 
you access to all dispatched actions
so that you can react to them,
you just react differently than in the reducer because in the reducer,
you of course also get access to all 
dispatched actions as you learned */

@Injectable()
export class AuthEffects {
  authLogin$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.LOGIN_START),
      switchMap((authData: AuthActions.LoginStart) => {
        return this.http
          .post<AuthResponseData>(
            'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=' +
              environment.firebaseAPIKey,
            {
              email: authData.payload.email,
              password: authData.payload.password,
              returnSecureToken: true,
            }
          )
          .pipe(
            tap((resData) => {
              this.authService.autoLogOut(+resData.expiresIn * 1000);
            }),
            map((resData) => {
              return handleAuthentication(
                resData.email,
                resData.localId,
                resData.idToken,
                +resData.expiresIn
              );
            }),
            catchError((errorResponse) => {
              //pt 366
              return handleError(errorResponse);
            })
          );
      })
    )
  );

  authRedirect$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.LOGIN),
        tap(() => {
          this.router.navigate(['/']);
        })
      ),
    { dispatch: false }
  );

  authSignup$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.SIGNUP_START),
      switchMap((signupAction: AuthActions.SignupStart) => {
        return this.http
          .post<AuthResponseData>(
            'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=' +
              environment.firebaseAPIKey,
            {
              email: signupAction.payload.email,
              password: signupAction.payload.password,
              returnSecureToken: true,
            }
          )
          .pipe(
            tap((resData) => {
              this.authService.autoLogOut(+resData.expiresIn * 1000);
            }),
            map((resData) => {
              return handleAuthentication(
                resData.email,
                resData.localId,
                resData.idToken,
                +resData.expiresIn
              );
            }),
            catchError((errorResponse) => {
              //pt 366
              return handleError(errorResponse);
            })
          );
      })
    )
  );

  authLogout$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.LOGOUT),
        tap(() => {
          this.authService.clearLogoutTimer;
          localStorage.removeItem('userData');
          this.router.navigate(['/']);
        })
      ),
    { dispatch: false }
  );

  autoLogin$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.AUTO_LOGIN),
      map(() => {
        const userData: {
          email: string;
          id: string;
          _token: string;
          _tokenExpirationDate: Date;
        } = JSON.parse(localStorage.getItem('userData'));

        if (!userData) {
          return { type: 'DUMMY' };
        }

        const loadedUser = new User(
          userData.email,
          userData.id,
          userData._token,
          new Date(userData._tokenExpirationDate)
        );

        if (!loadedUser.token) {
          //this.user.next(loadedUser);
          const expTimer =
            new Date(userData._tokenExpirationDate).getTime() -
            new Date().getTime();
          this.authService.autoLogOut(expTimer);
          return new AuthActions.Login({
            email: loadedUser.email,
            userId: loadedUser.id,
            token: loadedUser.token,
            expiryDate: new Date(userData._tokenExpirationDate),
          });
          // this.autoLogOut(expTimer);
        }
        return { type: 'DUMMY' };
      })
    )
  );

  constructor(
    private actions$: Actions,
    private http: HttpClient,
    private router: Router,
    private authService: AuthService
  ) {}
}
