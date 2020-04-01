import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {SysLogLoginComponent} from './sys-log-login/sys-log-login.component';
import {SysLogOperationComponent} from './sys-log-operation/sys-log-operation.component';
import {SysLogErrorComponent} from './sys-log-error/sys-log-error.component';


const routes: Routes = [
  { path: 'login', component: SysLogLoginComponent },
  { path: 'operation', component: SysLogOperationComponent },
  { path: 'error', component: SysLogErrorComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SysLogRoutingModule { }
