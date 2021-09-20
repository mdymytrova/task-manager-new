import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Subject, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { User } from './user';

interface AuthResponseData {
    kind: string;
    idToken: string;
    email: string;
    refreshToken: string;
    expiresIn: string;
    localId: string;
    registered?: boolean;
};

enum FB_AUTH_ERROR {
    EMAIL_EXISTS = 'EMAIL_EXISTS',
    OPERATION_NOT_ALLOWED = 'OPERATION_NOT_ALLOWED',
    TOO_MANY_ATTEMPTS_TRY_LATER = 'TOO_MANY_ATTEMPTS_TRY_LATER',
    EMAIL_NOT_FOUND = 'EMAIL_NOT_FOUND',
    INVALID_PASSWORD = 'INVALID_PASSWORD',
    USER_DISABLED = 'USER_DISABLED'
}

@Injectable({providedIn: 'root'})
export class AuthService {
    public userSignIn = new BehaviorSubject<User>(null);
    private expirationTimer;

    constructor(private http: HttpClient, private router: Router) {}

    public signIn(email, password, isSignUpMode) {
        const method = isSignUpMode ? 'signUp' : 'signInWithPassword';
        return this.http.post<AuthResponseData>(`https://identitytoolkit.googleapis.com/v1/accounts:${method}?key=AIzaSyC54CAzDX7_SO8wi1B3FDUHhnKZBB-YCZA`, {
            email,
            password,
            returnSecureToken: true
        }).pipe(catchError(errorResponse => {
            return throwError(this.errorMessage(errorResponse?.error?.error?.message));
        }), tap(responseData => {
            const expirationDate: Date = new Date(new Date().getTime() + +responseData.expiresIn * 1000);
            const user = new User(responseData.email, responseData.localId, expirationDate, responseData.idToken);
            localStorage.setItem('userData', JSON.stringify(user));
            this.userSignIn.next(user);
            this.autoLogout(+responseData.expiresIn * 1000);
        }));
    }

    public signOut() {
        this.userSignIn.next(null);
        this.router.navigate(['/signin']);
        localStorage.removeItem('userData');
        if (this.expirationTimer) {
            clearTimeout(this.expirationTimer);
        }
        this.expirationTimer = null;
    }

    public autoLogin() {
        const userData = JSON.parse(localStorage.getItem('userData'));
        if (!userData) {
            return;
        }
        const signedUser = new User(userData.email, userData.id, new Date(userData.tokenExpirationDate), userData._token);
        if (signedUser.token) {
            this.userSignIn.next(signedUser);
            const expiresIn = new Date(userData.tokenExpirationDate).getTime() - new Date().getTime();
            this.autoLogout(expiresIn);
        }
    }

    public autoLogout(expirationIn) {
        this.expirationTimer = setTimeout(() => {
            this.signOut();
        }, expirationIn);
    }

    private errorMessage(message) {
        const errorMessages = {
            default: 'An error has occured',
            [FB_AUTH_ERROR.EMAIL_EXISTS]: 'User with this email already exists.',
            [FB_AUTH_ERROR.OPERATION_NOT_ALLOWED]: 'Sign in is disabled.',
            [FB_AUTH_ERROR.TOO_MANY_ATTEMPTS_TRY_LATER]: 'Sign in is blocked, try again later.',
            [FB_AUTH_ERROR.EMAIL_NOT_FOUND]: 'User with this email does not exist.',
            [FB_AUTH_ERROR.INVALID_PASSWORD]: 'Password is invalid.',
            [FB_AUTH_ERROR.USER_DISABLED]: 'User account has been disabled.'
        };
        return errorMessages[message] || errorMessages.default;
    }
}