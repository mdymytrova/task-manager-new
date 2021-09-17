import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './router/app-routing.module';
import { MaterialModule } from './material/material.module';

import { TasksModule } from './tasks/tasks.module';
import { TaskFormModalComponent } from './modal/task-form-modal.component';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SearchComponent } from './search/search.component';

import { TasksEventService } from './services/tasks-event.service';
import { PageSelectionEventService } from './services/page-selection-event.service';
import { TasksDataService } from './services/tasks-data.service';

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
    TasksModule,
    AppRoutingModule
  ],
  providers: [
    TasksDataService,
    TasksEventService,
    PageSelectionEventService
  ],
  entryComponents: [TaskFormModalComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  bootstrap: [AppComponent]
})
export class AppModule { }
