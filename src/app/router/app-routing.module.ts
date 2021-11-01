import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DashboardComponent } from '../dashboard/dashboard.component';
import { SearchComponent } from '../search/search.component';
import { AuthComponent } from '../auth/auth.component';
import { AuthFormModalComponent } from '../auth/auth-form/auth-form-modal.component';

const appRoutes: Routes = [
  { path: '', redirectTo: '/tasks', pathMatch: 'full' },
  { path: 'tasks', loadChildren: () => {
    return import('../tasks/tasks.module').then((module) => module.TasksModule);
  }},
  { path: 'dashboard', component: DashboardComponent},
  { path: 'search', component: SearchComponent},
  { path: 'signin', component: AuthComponent },
  { path: 'signin', component: AuthFormModalComponent, outlet: 'modal' },
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
