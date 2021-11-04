import { Component, Inject, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';

import * as fromApp from '../../store/app.reducer';
import { login } from '../store/auth.actions';

interface AuthModalData {
    email: string;
    password: string;
}
@Component({
    selector: 'app-auth-form',
    templateUrl: './auth-form.component.html'
})
export class AuthFormComponent implements OnInit, OnDestroy {
    public form: FormGroup;
    public hidePassword: boolean;
    public isSignUpMode: boolean;
    public errorMessage: string;
    private storeSubscription: Subscription;

    constructor(
        private formBuilder: FormBuilder,
        private dialogRef: MatDialogRef<AuthFormComponent>,
        private store: Store<fromApp.AppState>,
        @Inject(MAT_DIALOG_DATA) dialogData: AuthModalData
    ) { }

    public ngOnInit() {
        this.hidePassword = true;
        this.isSignUpMode = false;
        this.errorMessage = null;
        this.form = this.formBuilder.group({
            email: ['', [Validators.required, Validators.email]],
            password: ['', [Validators.required, Validators.minLength(6)]]
        });
        this.storeSubscription = this.store.select('auth').subscribe(authState => {
            this.errorMessage = authState.authError;
            if (authState.user && !authState.authError) {
                this.dialogRef.close();
            }
        })
    }

    public ngOnDestroy() {
        if (this.storeSubscription) {
            this.storeSubscription.unsubscribe();
        }
    }

    public signIn() {
        if (this.form.valid) {
            const { email, password } = this.form.value;
            const method = this.isSignUpMode ? 'signUp' : 'signInWithPassword';
            this.store.dispatch(login({
                email,
                password,
                method
            }));
        }
    }
}