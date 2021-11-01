import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';

import { AuthService } from '../auth.service';

interface AuthModalData {
    email: string;
    password: string;
}
@Component({
    selector: 'app-auth-form',
    templateUrl: './auth-form.component.html'
})
export class AuthFormComponent implements OnInit {
    public form: FormGroup;
    public hidePassword: boolean;
    public isSignUpMode: boolean;
    public errorMessage;

    constructor(
        private formBuilder: FormBuilder,
        private dialogRef: MatDialogRef<AuthFormComponent>,
        private authService: AuthService,
        private router: Router,
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
    }

    public signIn() {
        if (this.form.valid) {
            const { email, password } = this.form.value;
            this.authService.signIn(email, password, this.isSignUpMode).subscribe(response => {
                this.router.navigate(['']);
                this.dialogRef.close();
            }, errorMessage => {
                this.errorMessage = errorMessage;
            });
        }
    }
}