import { Injectable } from '@angular/core';
import {Api} from '../../../helpers/http/api';
import {ApiPath} from '../../../api-path';
import {Utils} from '../../../helpers/utils';

@Injectable({
  providedIn: 'root'
})
export class PermissionManageService {

  constructor(private api: Api, private utils: Utils) { }

  /**
   * 获取权限详情。
   * @param id 权限id。
   */
  getPermissionById(id: string): any {
    return this.api.get(`${ApiPath.usercentral.rolePermissions.getPermissionById}/${id}`);
  }

  /**
   * 新增接口权限。
   * @param body 请求体参数。
   */
  addPermission(body: any): any {
    return this.api.post(ApiPath.usercentral.rolePermissions.addPermission, body);
  }

  /**
   * 更新接口权限。
   * @param body 请求体参数。
   */
  updatePermission(body: any): any {
    return this.api.post(ApiPath.usercentral.rolePermissions.updatePermission, body);
  }

  /**
   * 删除接口权限。
   * @param ids 权限id，可以多个。
   */
  delPermission(...ids: any[]): any {
    const par = this.utils.arrayToArrayParam(ids);
    const path = `${ApiPath.usercentral.rolePermissions.delPermission}/${par}`;
    return this.api.delete(path);
  }

  /**
   * 分页获取权限列表。
   * @param body 请求体。
   */
  getPermissionListPage(body: any): any {
    return this.api.post(ApiPath.usercentral.rolePermissions.getPermissionListPage, body);
  }

}
