import { Action } from '@ngrx/store';

export interface IAuthUser {
    email: string,
    localId: string,
    expirationDate: Date,
    idToken: string
};

export const LOGIN_ACTION = 'LOGIN';
export const LOGOUT_ACTION = 'LOGOUT';

export class Login implements Action {
    readonly type = LOGIN_ACTION;
    constructor(public payload: IAuthUser) { }
}

export class Logout implements Action {
    readonly type = LOGOUT_ACTION;
}

export type all = Login | Logout;