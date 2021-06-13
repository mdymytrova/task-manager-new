import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TaskFormModalComponent } from '../modal/task-form-modal.component';
import { TaskDetailsComponent } from './task-details/task-details.component';
import { TasksComponent } from './tasks.component';

const appRoutes: Routes = [
  { 
    path: 'tasks',
    component: TasksComponent,
    children: [
      { path: ':id', component: TaskDetailsComponent, data: {mode: 'embedded'}},
      { path: ':id', component: TaskFormModalComponent, outlet: 'edit' }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(appRoutes)],
  exports: [RouterModule]
})
export class TaskRoutingModule { }
