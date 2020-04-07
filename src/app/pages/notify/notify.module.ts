import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NotifyRoutingModule } from './notify-routing.module';
import { NotifySmsRecordComponent } from './notify-sms-record/notify-sms-record.component';
import { NotifySmsManageComponent } from './notify-sms-manage/notify-sms-manage.component';
import { NotifyEmailRecordComponent } from './notify-email-record/notify-email-record.component';
import { NotifyEmailManageComponent } from './notify-email-manage/notify-email-manage.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { UEditorModule } from 'ngx-ueditor';

/*短信、邮件通知模块*/
@NgModule({
  declarations: [NotifySmsRecordComponent, NotifySmsManageComponent, NotifyEmailRecordComponent, NotifyEmailManageComponent],
  imports: [
    CommonModule,
    FormsModule,
    NgZorroAntdModule,
    ReactiveFormsModule,
    NotifyRoutingModule,
    UEditorModule
  ]
})
export class NotifyModule { }
