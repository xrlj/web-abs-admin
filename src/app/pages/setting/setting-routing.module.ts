import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {UserManageComponent} from './user-manage/user-manage.component';
import {DepartmentManageComponent} from './department-manage/department-manage.component';
import {AppManageComponent} from './app-manage/app-manage.component';
import {MenuManageComponent} from './menu-manage/menu-manage.component';
import {RoleManageComponent} from './role-manage/role-manage.component';
import {PermissionManageComponent} from './permission-manage/permission-manage.component';
import {ParameterManageComponent} from './parameter-manage/parameter-manage.component';
import {DictionaryTypeComponent} from './dictionary-manage/dictionary-type/dictionary-type.component';
import {FileManageComponent} from './file-manage/file-manage.component';
import {ZhAreaManageComponent} from './zh-area-manage/zh-area-manage.component';
import {DictionaryManageComponent} from './dictionary-manage/dictionary-manage.component';

const routes: Routes = [
  { path: 'user', component: UserManageComponent },
  { path: 'department', component: DepartmentManageComponent },
  { path: 'app', component: AppManageComponent },
  { path: 'menu', component: MenuManageComponent },
  { path: 'role', component: RoleManageComponent },
  { path: 'parameter', component: ParameterManageComponent },
  { path: 'permission', component: PermissionManageComponent },
  { path: 'parameter', component: ParameterManageComponent },
  { path: 'dictionary', component: DictionaryManageComponent},
  { path: 'dictionary-type', component: DictionaryTypeComponent},
  { path: 'file', component: FileManageComponent},
  { path: 'zh-area', component: ZhAreaManageComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SettingRoutingModule {}
