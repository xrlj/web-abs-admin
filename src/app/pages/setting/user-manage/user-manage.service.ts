import { Injectable } from '@angular/core';
import {Api} from '../../../helpers/http/api';
import {ApiPath} from '../../../api-path';
import {VUserReq} from '../../../helpers/vo/req/v-user-req';
import {Utils} from '../../../helpers/utils';
import {VUserPwdReq} from '../../../helpers/vo/req/v-user-pwd-req';
import {ContentTypeEnum} from '../../../helpers/http/content-type-enum';
import {VUserSearchReq} from '../../../helpers/vo/req/v-user-search-req';

@Injectable({
  providedIn: 'root'
})
export class UserManageService {

  constructor(private api: Api, private utils: Utils) { }

  /**
   * 判断用户名是否已经被占用。
   * @param username 用户名。
   */
  exitUsername(username: string): any {
    return this.api.get(`${ApiPath.usercentral.userApi.exitUsername}/${username}`);
  }

  /**
   * 添加系统用户.
   * @param vUserReq 表单体
   */
  addSystemUser(vUserReq: VUserReq): any {
    return this.api.post(ApiPath.usercentral.userApi.addSystemUser, vUserReq);
  }

  /**
   * 更新系统用户信息。
   */
  updateSystemUser(vUserReq: VUserReq): any {
    return this.api.post(ApiPath.usercentral.userApi.updateSystemUser, vUserReq);
  }

  /**
   * 获取用户列表。
   * @param vUserSearchReq 请求体。
   */
  getUserList(vUserSearchReq: VUserSearchReq): any {
    return this.api.post(ApiPath.usercentral.userApi.getUserList, vUserSearchReq);
  }

  /**
   * 更新用户状态
   */
  updateUserStatus(id: string, userStatus: number): any {
    const par: VUserReq = {
      userId: id,
      status: userStatus
    };
    const path = ApiPath.usercentral.userApi.updateUserStatus;
    return this.api.post(path, par);
  }

  /**
   * 根据用户id获取用户信息。
   * @param userId 用户id。
   */
  getUserInfoById(userId: string): any {
    const path = `${ApiPath.usercentral.userApi.getUserInfoById}/${userId}`;
    return this.api.get(path);
  }

  /**
   * 批量删除用户。
   * @param userIds 用户id。
   */
  delUser(...userIds: any[]): any {
    let idsPar  = '';
    userIds.forEach((value, index) => {
      idsPar = idsPar.concat(value);
      if (index !== userIds.length - 1) {
        idsPar = idsPar.concat(',');
      }
    });
    return this.api.delete(`${ApiPath.usercentral.userApi.delUser}/${idsPar}`);
  }

  /**
   * 获取用户可选角色列表。
   * @param userId 用户id。
   */
  getUserCanSelectRoles(userId: string): any {
    const path = `${ApiPath.usercentral.userApi.getUserCanSelectRoles}/${userId}`;
    return this.api.get(path);
  }

  /**
   * 获取用户角色。
   * @param username 用户名称。
   */
  getRolesByUserId(userId: string): any {
    const path = `${ApiPath.usercentral.userApi.getRolesByUserId}/${userId}`;
    return this.api.get(path);
  }

  /**
   * 添加用户角色。
   * @param userId1 用户id
   * @param roleIds1 角色ids
   */
  addUserRoles(userId1: any, roleIds1: any): any {
    const body = {
      userId: userId1,
      roleIds: roleIds1
    };
    return this.api.post(ApiPath.usercentral.userApi.addUserRoles, body);
  }

  /**
   * 修改用户密码。
   * @param vUserPwdReq 修改用户密码。
   */
  updateUserPassword(vUserPwdReq: VUserPwdReq): any {
    return this.api.post(ApiPath.usercentral.userApi.updateUserPassword, vUserPwdReq);
  }

  /**
   * 重置密码。
   * @param id 用户id
   */
  resetUserPassword(id: string): any {
    return this.api.post(ApiPath.usercentral.userApi.resetUserPassword, null, 0, {userId: id}, ContentTypeEnum.APPLICATION_FORM_URLENCODED_VALUE);
  }
}
