import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DefaultComponent, BlankComponent } from '../theme/layouts';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full'
  },
  {
    path: 'pages',
    component: DefaultComponent,
    children: [
      { path: '', component: DashboardComponent },
      {
        path: 'navigation',
        loadChildren: './navigation/navigation.module#NavigationModule'
      }
    ]
  },
  {
    path: '',
    component: BlankComponent,
    children: [{ path: 'login', component: LoginComponent }]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule {}
