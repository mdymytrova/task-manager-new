import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthService } from '../auth/auth.service';
import { logoutSuccess } from '../auth/store/auth.actions';
import * as fromApp from '../store/app.reducer';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})

export class HeaderComponent implements OnInit, OnDestroy {
    public isAuthenticated: boolean;
    public username: string;
    private userSignInSubscription: Subscription;

    constructor(public matDialog: MatDialog, private store: Store<fromApp.AppState>) { }

    public ngOnInit(): void {
        this.isAuthenticated = false;
        this.userSignInSubscription = this.store.select('auth').pipe(map(authState => authState.user)).subscribe(this.onUserSignIn);
    }

    public ngOnDestroy() {
        if (this.userSignInSubscription) {
            this.userSignInSubscription.unsubscribe();
        }
    }

    public onSignOut() {
        this.username = null;
        this.store.dispatch(logoutSuccess());
    }

    private onUserSignIn = (user) => {
        this.isAuthenticated = !!user;
        if (this.isAuthenticated) {
            this.username = user.email;
        }
    }

}