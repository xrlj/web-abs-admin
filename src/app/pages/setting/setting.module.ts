import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {UserManageComponent} from './user-manage/user-manage.component';
import {AppManageComponent} from './app-manage/app-manage.component';
import {DepartmentManageComponent} from './department-manage/department-manage.component';
import {RoleManageComponent} from './role-manage/role-manage.component';
import {PermissionManageComponent} from './permission-manage/permission-manage.component';
import {MenuManageComponent} from './menu-manage/menu-manage.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NgZorroAntdModule} from 'ng-zorro-antd';
import {SettingRoutingModule} from './setting-routing.module';
import {ParameterManageComponent} from './parameter-manage/parameter-manage.component';
import {DictionaryComponent} from './dictionary-manage/dictionary/dictionary.component';
import {DictionaryTypeComponent} from './dictionary-manage/dictionary-type/dictionary-type.component';
import { FileManageComponent } from './file-manage/file-manage.component';
import { ZhAreaManageComponent } from './zh-area-manage/zh-area-manage.component';
import { DictionaryManageComponent } from './dictionary-manage/dictionary-manage.component';


@NgModule({
  declarations: [UserManageComponent, AppManageComponent, DepartmentManageComponent,
    RoleManageComponent, PermissionManageComponent, MenuManageComponent, ParameterManageComponent,
    DictionaryComponent, DictionaryTypeComponent, FileManageComponent, ZhAreaManageComponent,
    DictionaryManageComponent],
  imports: [
    CommonModule,
    FormsModule,
    NgZorroAntdModule,
    ReactiveFormsModule,
    SettingRoutingModule
  ]
})
export class SettingModule { }
