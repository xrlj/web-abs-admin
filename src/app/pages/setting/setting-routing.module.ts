import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {UserManageComponent} from './user-manage/user-manage.component';
import {DepartmentManageComponent} from './department-manage/department-manage.component';
import {AppManageComponent} from './app-manage/app-manage.component';
import {MenuManageComponent} from './menu-manage/menu-manage.component';
import {RoleManageComponent} from './role-manage/role-manage.component';
import {PermissionManageComponent} from './permission-manage/permission-manage.component';

const routes: Routes = [
  { path: 'user', component: UserManageComponent },
  { path: 'department', component: DepartmentManageComponent },
  { path: 'app', component: AppManageComponent },
  { path: 'menu', component: MenuManageComponent },
  { path: 'role', component: RoleManageComponent },
  { path: 'permission', component: PermissionManageComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SettingRoutingModule {}
