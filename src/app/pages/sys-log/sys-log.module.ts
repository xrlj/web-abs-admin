import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SysLogRoutingModule } from './sys-log-routing.module';
import { SysLogLoginComponent } from './sys-log-login/sys-log-login.component';
import { SysLogOperationComponent } from './sys-log-operation/sys-log-operation.component';
import { SysLogErrorComponent } from './sys-log-error/sys-log-error.component';


@NgModule({
  declarations: [SysLogLoginComponent, SysLogOperationComponent, SysLogErrorComponent],
  imports: [
    CommonModule,
    SysLogRoutingModule
  ]
})
export class SysLogModule { }
