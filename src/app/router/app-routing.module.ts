import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DashboardComponent } from '../dashboard/dashboard.component';
import { TaskFormModalComponent } from '../tasks/task-form/task-form-modal.component';
import { SearchComponent } from '../search/search.component';
import { TaskResolverService } from '../services/task-resolver.service';
import { TaskDetailsComponent } from '../tasks/task-details/task-details.component';
import { AuthComponent } from '../auth/auth.component';
import { AuthFormModalComponent } from '../auth/auth-form/auth-form-modal.component';
import { AuthGuard } from '../auth/auth-guard';

const appRoutes: Routes = [
  { path: '', redirectTo: '/tasks', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent},
  { path: 'search', component: SearchComponent},
  { path: 'signin', component: AuthComponent },
  { path: 'signin', component: AuthFormModalComponent, outlet: 'modal' },
  { path: 'create', component: TaskFormModalComponent, outlet: 'modal', canActivate: [AuthGuard]},
  { path: 'task/:id', component: TaskDetailsComponent, data: { mode: 'standalone' }, resolve: { task: TaskResolverService }, canActivate: [AuthGuard]},
  { path: 'task/:id', component: TaskFormModalComponent, outlet: 'modal', resolve: { task: TaskResolverService }, canActivate: [AuthGuard]},
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
