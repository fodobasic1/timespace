import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PresenceComponent } from './presence/presence.component';
import { SettingsComponent } from './auth/settings/settings.component';
import { EmployeesComponent } from './employees/employees-list/employees.component';

const routes: Routes = [
  { path: '', redirectTo: 'settings', pathMatch: 'full' },
  { path: 'settings', loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule) },
  { path: 'presence', component: PresenceComponent },
  { path: 'users', loadChildren: () => import('./employees/employees.module').then(m => m.EmployeesModule) }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
