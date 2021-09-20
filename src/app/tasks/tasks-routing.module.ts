import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TaskFormModalComponent } from './task-form/task-form-modal.component';
import { TaskResolverService } from '../services/task-resolver.service';
import { TaskDetailsComponent } from './task-details/task-details.component';
import { TasksComponent } from './tasks.component';
import { AuthGuard } from '../auth/auth-guard';

const appRoutes: Routes = [
  { 
    path: 'tasks',
    component: TasksComponent,
    canActivate: [AuthGuard],
    children: [
      { path: ':id', component: TaskDetailsComponent, data: { mode: 'embedded' }, resolve: { task: TaskResolverService } }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(appRoutes)],
  exports: [RouterModule]
})
export class TaskRoutingModule { }
