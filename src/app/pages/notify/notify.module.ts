import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NotifyRoutingModule } from './notify-routing.module';
import { NotifySmsRecordComponent } from './notify-sms-record/notify-sms-record.component';
import { NotifySmsManageComponent } from './notify-sms-manage/notify-sms-manage.component';
import { NotifyEmailRecordComponent } from './notify-email-record/notify-email-record.component';
import { NotifyEmailManageComponent } from './notify-email-manage/notify-email-manage.component';


@NgModule({
  declarations: [NotifySmsRecordComponent, NotifySmsManageComponent, NotifyEmailRecordComponent, NotifyEmailManageComponent],
  imports: [
    CommonModule,
    NotifyRoutingModule
  ]
})
export class NotifyModule { }
