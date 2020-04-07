import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AnnouncementMyComponent} from './announcement-my/announcement-my.component';
import {AnnouncementManageComponent} from './announcement-manage/announcement-manage.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NgZorroAntdModule} from 'ng-zorro-antd';
import {AnnouncementRoutingModule} from './announcement-routing.module';
import { UEditorModule } from 'ngx-ueditor';

/*站内通知模块*/
@NgModule({
  declarations: [AnnouncementMyComponent, AnnouncementManageComponent],
  imports: [
    CommonModule,
    AnnouncementRoutingModule,
    FormsModule,
    NgZorroAntdModule,
    ReactiveFormsModule,
    UEditorModule
  ]
})
export class AnnouncementModule { }
