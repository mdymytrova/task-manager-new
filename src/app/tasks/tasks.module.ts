import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { TasksComponent } from './tasks.component';
import { TaskDetailsComponent } from './task-details/task-details.component';
import { TaskListComponent } from './task-list/task-list.component';
import { TaskListItemComponent } from './task-list/task-list-item/task-list-item.component';
import { PipesModule } from '../pipes/pipes.module';
import { ModalModule } from '../modal/modal.module';
import { MaterialModule } from '../material/material.module';
import { TaskRoutingModule } from './tasks-routing.module';
import { TaskFormComponent } from './task-form/task-form.component';
import { TaskDataService } from './services/task-data.service';

@NgModule({
  declarations: [
    TasksComponent,
    TaskListComponent,
    TaskListItemComponent,
    TaskDetailsComponent,
    TaskFormComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    PipesModule,
    ModalModule,
    MaterialModule,
    TaskRoutingModule
  ],
  exports: [TasksComponent],
  providers: [TaskDataService]
})
export class TasksModule { }
