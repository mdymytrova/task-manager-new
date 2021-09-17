import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DashboardComponent } from '../dashboard/dashboard.component';
import { TaskFormModalComponent } from '../modal/task-form-modal.component';
import { SearchComponent } from '../search/search.component';
import { TaskResolverService } from '../services/task-resolver.service';
import { TaskDetailsComponent } from '../tasks/task-details/task-details.component';

const appRoutes: Routes = [
  { path: 'dashboard', component: DashboardComponent},
  { path: 'search', component: SearchComponent},
  { path: 'task', component: TaskFormModalComponent, outlet: 'create' },
  { path: 'task/:id', component: TaskDetailsComponent, data: { mode: 'standalone' }, resolve: { task: TaskResolverService } },
  { path: 'task/:id', component: TaskFormModalComponent, outlet: 'standalone-edit', resolve: { task: TaskResolverService } },
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
