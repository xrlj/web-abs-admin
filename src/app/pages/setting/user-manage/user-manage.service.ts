import { Injectable } from '@angular/core';
import {Api} from '../../../helpers/http/api';
import {ApiPath} from '../../../api-path';
import {VUserReq} from '../../../helpers/vo/req/v-user-req';

@Injectable({
  providedIn: 'root'
})
export class UserManageService {

  constructor(private api: Api) { }

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
  addOrUpdateSystemUser(vUserReq: VUserReq): any {
    return this.api.post(ApiPath.usercentral.userApi.addSystemUser, vUserReq);
  }

  /**
   * 获取企业下所有用户。
   * @param body 请求体。
   */
  getEtpUsers(body: any): any {
    return this.api.post(ApiPath.usercentral.userApi.getEtpUsers, body);
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
}
