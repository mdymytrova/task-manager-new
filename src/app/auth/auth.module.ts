import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MaterialModule } from '../material/material.module';
import { AuthComponent } from './auth.component';
import { AuthFormComponent } from './auth-form/auth-form.component';
import { AuthFormModalComponent } from './auth-form/auth-form-modal.component';
@NgModule({
  declarations: [
    AuthComponent,
    AuthFormComponent,
    AuthFormModalComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    MaterialModule,
    RouterModule
  ],
  exports: [],
  providers: []
})
export class AuthModule { }
