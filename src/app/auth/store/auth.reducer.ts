import { User } from '../user';
import * as AuthActions from './auth.actions';

export interface IAuthState {
    user: User;
}

const initialState: IAuthState = {
    user: null
};

export function authReducer(state: IAuthState = initialState, action: AuthActions.all) {
    switch (action.type) {
        case AuthActions.LOGIN_ACTION:
            const user = new User(action.payload.email, action.payload.localId, action.payload.expirationDate, action.payload.idToken);
            return {
                ...state,
                user
            };
        case AuthActions.LOGOUT_ACTION:
            return {
                ...state,
                user: null
            };
        default:
            return state;
    }
}
