import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TaskFormModalComponent } from '../modal/task-form-modal.component';
import { TaskResolverService } from '../services/task-resolver.service';
import { TaskDetailsComponent } from './task-details/task-details.component';
import { TasksComponent } from './tasks.component';

const appRoutes: Routes = [
  { 
    path: 'tasks',
    component: TasksComponent,
    children: [
      { path: ':id', component: TaskDetailsComponent, data: { mode: 'embedded' }, resolve: { task: TaskResolverService } },
      { path: ':id', component: TaskFormModalComponent, outlet: 'edit', resolve: { task: TaskResolverService } }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(appRoutes)],
  exports: [RouterModule]
})
export class TaskRoutingModule { }
