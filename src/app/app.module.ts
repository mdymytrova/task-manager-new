import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './router/app-routing.module';
import { MaterialModule } from './material/material.module';
import { AuthModule } from './auth/auth.module';
import { TasksModule } from './tasks/tasks.module';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SearchComponent } from './search/search.component';

import { TasksEventService } from './services/tasks-event.service';
import { PageSelectionEventService } from './services/page-selection-event.service';
import { TasksDataService } from './services/tasks-data.service';
import { AuthInterceptorService } from './auth/auth-interceptor.service';

import { TaskFormModalComponent } from './tasks/task-form/task-form-modal.component';
import { AuthFormModalComponent } from './auth/auth-form/auth-form-modal.component';
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    DashboardComponent,
    SearchComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    CommonModule,
    MaterialModule,
    AuthModule,
    AppRoutingModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true
    }
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  bootstrap: [AppComponent]
})
export class AppModule { }
