import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { TasksComponent } from './tasks.component';
import { TaskDetailsComponent } from './task-details/task-details.component';
import { TaskListComponent } from './task-list/task-list.component';
import { TaskFormModalComponent } from './task-form/task-form-modal.component';
import { TaskListItemComponent } from './task-list/task-list-item/task-list-item.component';
import { PipesModule } from '../pipes/pipes.module';
import { ModalModule } from '../modal/modal.module';
import { MaterialModule } from '../material/material.module';
import { TaskRoutingModule } from './tasks-routing.module';
import { TaskFormComponent } from './task-form/task-form.component';
import { TasksDrawerComponent } from './tasks-drawer/tasks-drawer.component';
import { TaskGuard } from '../services/task.guard';

@NgModule({
  declarations: [
    TasksComponent,
    TasksDrawerComponent,
    TaskListComponent,
    TaskListItemComponent,
    TaskDetailsComponent,
    TaskFormComponent,
    TaskFormModalComponent
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
  providers: [TaskGuard]
})
export class TasksModule { }
