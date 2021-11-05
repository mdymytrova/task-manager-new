import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from '../auth/auth-guard';
import { TaskFormModalComponent } from './task-form/task-form-modal.component';
import { TaskResolverService } from '../services/task-resolver.service';
import { TaskDetailsComponent } from './task-details/task-details.component';
import { TasksComponent } from './tasks.component';
import { TasksDrawerComponent } from './tasks-drawer/tasks-drawer.component';
import { TaskGuard } from '../services/task.guard';

const appRoutes: Routes = [
  { 
    path: '',
    component: TasksComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '', component: TasksDrawerComponent,
        children: [
          { 
            path: ':id',
            component: TaskDetailsComponent,
            data: { mode: 'embedded' },
            canActivate: [TaskGuard]
          }
        ]
      },
      {
        path: 'create',
        component: TaskFormModalComponent,
        outlet: 'modal',
        data: { mode: 'create' }
      },
      {
        path: 'task/:id',
        component: TaskDetailsComponent,
        data: { mode: 'standalone' },
        canActivate: [TaskGuard]
      },
      {
        path: 'task/:id',
        component: TaskFormModalComponent,
        outlet: 'modal',
        data: { mode: 'edit' }
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(appRoutes)],
  exports: [RouterModule]
})
export class TaskRoutingModule { }
