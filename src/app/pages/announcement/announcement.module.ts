import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AnnouncementMyComponent} from './announcement-my/announcement-my.component';
import {AnnouncementManageComponent} from './announcement-manage/announcement-manage.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NgZorroAntdModule} from 'ng-zorro-antd';
import {AnnouncementRoutingModule} from './announcement-routing.module';


@NgModule({
  declarations: [AnnouncementMyComponent, AnnouncementManageComponent],
  imports: [
    CommonModule,
    AnnouncementRoutingModule,
    FormsModule,
    NgZorroAntdModule,
    ReactiveFormsModule
  ]
})
export class AnnouncementModule { }
