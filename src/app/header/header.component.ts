import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthService } from '../auth/auth.service';
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

    constructor(public matDialog: MatDialog, private authService: AuthService, private router: Router, private store: Store<fromApp.AppState>) { }

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
        this.authService.signOut();
    }

    private onUserSignIn = (user) => {
        this.isAuthenticated = !!user;
        if (this.isAuthenticated) {
            this.username = user.email;
        }
    }

}