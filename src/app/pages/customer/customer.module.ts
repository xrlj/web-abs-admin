import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EtpManageComponent } from './etp-manage/etp-manage.component';
import { EtpAccountComponent } from './etp-account/etp-account.component';
import {CustomerRoutingModule} from './customer-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgZorroAntdModule } from 'ng-zorro-antd';



@NgModule({
  declarations: [EtpManageComponent, EtpAccountComponent],
  imports: [
    CommonModule,
    CustomerRoutingModule,
    FormsModule,
    NgZorroAntdModule,
    ReactiveFormsModule
  ]
})
export class CustomerModule { }
