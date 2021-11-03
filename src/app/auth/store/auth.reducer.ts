import { createReducer, on } from '@ngrx/store';
import { User } from '../user';
import { login, loginFail, loginSuccess, logoutSuccess } from './auth.actions';

export interface IAuthState {
    user: User;
    authError: string;
}

const initialState: IAuthState = {
    user: null,
    authError: null
};

export const authReducer = createReducer(
    initialState,
    on(login, (state, payload) => {
        return {
            ...state,
            authError: null
        };
    }),
    on(loginSuccess, (state, { payload }) => {
        return {
            ...state,
            user: new User(payload.email, payload.localId, payload.expirationDate, payload.idToken),
            authError: null
        };
    }),
    on(loginFail, (state, { payload }) => {
        return {
            ...state,
            user: null,
            authError: payload
        };
    }),
    on(logoutSuccess, (state) => {
        return {
            ...state,
            user: null,
            authError: null
        };
    })
);
