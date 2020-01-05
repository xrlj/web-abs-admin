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
  addSystemUser(vUserReq: VUserReq): any {
    return this.api.post(ApiPath.usercentral.userApi.addSystemUser, vUserReq);
  }

  getEtpUsers(body: any): any {
    return this.api.post(ApiPath.usercentral.userApi.getEtpUsers, body);
  }
}