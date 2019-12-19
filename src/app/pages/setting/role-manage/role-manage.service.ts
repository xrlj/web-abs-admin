import { Injectable } from '@angular/core';
import {Api} from '../../../helpers/http/api';
import {ApiPath} from '../../../api-path';
import {VRoleReq} from '../../../helpers/vo/req/v-role-req';

@Injectable({
  providedIn: 'root'
})
export class RoleManageService {

  constructor(private api: Api) { }

  /**
   * 分页获取角色列表。
   * @param vRoleReq 参数body。
   */
  getRolePage(vRoleReq: VRoleReq): any {
    return this.api.post(ApiPath.usercentral.roleApi.getAll, vRoleReq);
  }

  /**
   * 添加角色并授权菜单。
   * @param vRoleReq 参数对象。
   */
  saveRole(vRoleReq: VRoleReq): any {
    return this.api.post(ApiPath.usercentral.roleApi.save, vRoleReq);
  }
}
