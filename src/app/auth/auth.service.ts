import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

import * as fromApp from '../store/app.reducer';
import { logoutSuccess } from '../auth/store/auth.actions';

@Injectable({providedIn: 'root'})
export class AuthService {
    private expirationTimer;

    constructor( private store: Store<fromApp.AppState>) {}

    public setExpirationTimer(expirationIn) {
        this.expirationTimer = setTimeout(() => {
            this.store.dispatch(logoutSuccess());
        }, expirationIn);
    }

    public clearExpirationTimer() {
        if (this.expirationTimer) {
            clearTimeout(this.expirationTimer);
        }
        this.expirationTimer = null;
    }
}