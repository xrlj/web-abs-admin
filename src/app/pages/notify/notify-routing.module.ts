import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {NotifySmsManageComponent} from './notify-sms-manage/notify-sms-manage.component';
import {NotifySmsRecordComponent} from './notify-sms-record/notify-sms-record.component';
import {NotifyEmailManageComponent} from './notify-email-manage/notify-email-manage.component';
import {NotifyEmailRecordComponent} from './notify-email-record/notify-email-record.component';


const routes: Routes = [
  {path: 'sms', component: NotifySmsManageComponent},
  {path: 'sms-record', component: NotifySmsRecordComponent},
  {path: 'email', component: NotifyEmailManageComponent},
  {path: 'email-record', component: NotifyEmailRecordComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NotifyRoutingModule { }
