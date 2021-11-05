import { createAction, props } from '@ngrx/store';

export interface IAuthUser {
    email: string;
    localId: string;
    expirationDate: Date;
    idToken: string;
    redirect: boolean;
};

export const login = createAction('[Auth] Login', props<{email: string; password: string; method: string;}>());
export const loginSuccess = createAction('[Auth] Login Success', props<{payload: IAuthUser}>());
export const loginFail = createAction('[Auth] Login Fail', props<{payload: string}>());

export const logoutSuccess = createAction('[Auth] Logout Success');

export const authAutoLogin = createAction('[Auth] Auto Login');
