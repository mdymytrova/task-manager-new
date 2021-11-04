import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap, tap } from 'rxjs/operators';

import { environment } from '../../../environments/environment';
import { AuthService } from '../auth.service';
import { User } from '../user';
import { authAutoLogin, IAuthUser, login, loginFail, loginSuccess, logoutSuccess } from './auth.actions';

export interface AuthResponseData {
    kind: string;
    idToken: string;
    email: string;
    refreshToken: string;
    expiresIn: string;
    localId: string;
    registered?: boolean;
};

export enum FB_AUTH_ERROR {
    EMAIL_EXISTS = 'EMAIL_EXISTS',
    OPERATION_NOT_ALLOWED = 'OPERATION_NOT_ALLOWED',
    TOO_MANY_ATTEMPTS_TRY_LATER = 'TOO_MANY_ATTEMPTS_TRY_LATER',
    EMAIL_NOT_FOUND = 'EMAIL_NOT_FOUND',
    INVALID_PASSWORD = 'INVALID_PASSWORD',
    USER_DISABLED = 'USER_DISABLED'
}
@Injectable()
export class AuthEffects {
    login$ = createEffect(() => 
        this.actions$.pipe(
            ofType(login),
            switchMap((authPayload) => {
                return this.http.post<AuthResponseData>(
                    `https://identitytoolkit.googleapis.com/v1/accounts:${authPayload.method}?key=${environment.apiKey}`,
                    {
                        email: authPayload.email,
                        password: authPayload.password,
                        returnSecureToken: true
                    }
                ).pipe(
                    map((authResponse: AuthResponseData) => {
                        const expirationDate: Date = new Date(new Date().getTime() + +authResponse.expiresIn * 1000);
                        return loginSuccess({
                            payload: {
                                email: authResponse.email,
                                localId: authResponse.localId,
                                expirationDate,
                                idToken: authResponse.idToken
                            }
                        });
                    }),
                    catchError((errorResponse) => {
                        return of(loginFail({
                            payload: errorMessage(errorResponse?.error?.error?.message)
                        }));
                    })
                )
            })
        )
    );

    loginSuccess$ = createEffect(() => 
        this.actions$.pipe(
            ofType(loginSuccess),
            tap((authPayload: {payload: IAuthUser}) => {
                const user = new User(authPayload.payload.email, authPayload.payload.localId, authPayload.payload.expirationDate, authPayload.payload.idToken);
                localStorage.setItem('userData', JSON.stringify(user));
                const expiresIn = new Date(authPayload.payload.expirationDate).getTime() - new Date().getTime();
                this.authService.setExpirationTimer(expiresIn);
                this.router.navigate(['']);
            })
        ), { dispatch: false }
    );

    logoutSuccess$ = createEffect(() => 
        this.actions$.pipe(
            ofType(logoutSuccess),
            tap(() => {
                this.router.navigate(['/signin']);
                localStorage.removeItem('userData');
                this.authService.clearExpirationTimer();
            })
        ), { dispatch: false }
    );

    authAutoLogin$ = createEffect(() => 
        this.actions$.pipe(
            ofType(authAutoLogin),
            map(() => {
                const userData = JSON.parse(localStorage.getItem('userData'));
                if (!userData) {
                    return logoutSuccess();

                }
                const signedUser = new User(userData.email, userData.id, new Date(userData.tokenExpirationDate), userData._token);
                if (signedUser.token) {
                    return loginSuccess({
                        payload: {
                            email: userData.email,
                            localId: userData.id,
                            expirationDate: new Date(userData.tokenExpirationDate),
                            idToken: userData._token
                        }
                    });
                }
                return logoutSuccess();
            })
        )
    );

    constructor(private actions$: Actions, private http: HttpClient, private router: Router, private authService: AuthService) {}
}

function errorMessage(message) {
    const errorMessages = {
        default: 'An error has occured',
        [FB_AUTH_ERROR.EMAIL_EXISTS]: 'User with this email already exists.',
        [FB_AUTH_ERROR.OPERATION_NOT_ALLOWED]: 'Sign in is disabled.',
        [FB_AUTH_ERROR.TOO_MANY_ATTEMPTS_TRY_LATER]: 'Sign in is blocked, try again later.',
        [FB_AUTH_ERROR.EMAIL_NOT_FOUND]: 'User with this email does not exist.',
        [FB_AUTH_ERROR.INVALID_PASSWORD]: 'Password is incorrect.',
        [FB_AUTH_ERROR.USER_DISABLED]: 'User account has been disabled.'
    };
    return errorMessages[message] || errorMessages.default;
}
