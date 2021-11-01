import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from '../auth/auth-guard';
import { TaskFormModalComponent } from './task-form/task-form-modal.component';
import { TaskResolverService } from '../services/task-resolver.service';
import { TaskDetailsComponent } from './task-details/task-details.component';
import { TasksComponent } from './tasks.component';
import { TasksDrawerComponent } from './tasks-drawer/tasks-drawer.component';

const appRoutes: Routes = [
  { 
    path: '',
    component: TasksComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '', component: TasksDrawerComponent,
        children: [ { path: ':id', component: TaskDetailsComponent, data: { mode: 'embedded' }, resolve: { task: TaskResolverService } } ]
      },
      { path: 'create', component: TaskFormModalComponent, outlet: 'modal'},
      {
        path: 'task/:id', component: TaskDetailsComponent, data: { mode: 'standalone' }, resolve: { task: TaskResolverService } 
      },
      { path: 'task/:id', component: TaskFormModalComponent, outlet: 'modal', resolve: { task: TaskResolverService }},
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(appRoutes)],
  exports: [RouterModule]
})
export class TaskRoutingModule { }
