import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth/auth.service';

import { PageSelectionEventService } from '../services/page-selection-event.service';
import { HeaderPage } from '../tasks/enums';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})

export class HeaderComponent implements OnInit, OnDestroy {
    public headerPages = HeaderPage;
    public selectedPage: HeaderPage;
    public isAuthenticated: boolean;
    public username: string;
    private userSignInSubscription: Subscription;

    constructor(private pageSelectionEventService: PageSelectionEventService, public matDialog: MatDialog, private authService: AuthService, private router: Router) { }

    public ngOnInit(): void {
        this.isAuthenticated = false;
        this.userSignInSubscription = this.authService.userSignIn.subscribe(this.onUserSignIn);
        this.pageSelectionEventService.onPageSelect.next(HeaderPage.BACKLOG);
    }

    public ngOnDestroy() {
        if (this.userSignInSubscription) {
            this.userSignInSubscription.unsubscribe();
        }
    }

    public pageSelectionEventHandler = (selectedPage: HeaderPage) => {
        this.selectedPage = selectedPage;
        this.pageSelectionEventService.onPageSelect.next(selectedPage);
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