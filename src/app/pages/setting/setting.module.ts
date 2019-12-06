import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {UserManageComponent} from './user-manage/user-manage.component';
import {AppManageComponent} from './app-manage/app-manage.component';
import {DepartmentManageComponent} from './department-manage/department-manage.component';
import {RoleManageComponent} from './role-manage/role-manage.component';
import {PermissionManageComponent} from './permission-manage/permission-manage.component';
import {MenuManageComponent} from './menu-manage/menu-manage.component';
import {FormsModule} from '@angular/forms';
import {NgZorroAntdModule} from 'ng-zorro-antd';
import {SettingRoutingModule} from './setting-routing.module';


@NgModule({
  declarations: [UserManageComponent, AppManageComponent, DepartmentManageComponent, RoleManageComponent, PermissionManageComponent, MenuManageComponent],
  imports: [
    CommonModule,
    FormsModule,
    NgZorroAntdModule,
    SettingRoutingModule
  ]
})
export class SettingModule { }
