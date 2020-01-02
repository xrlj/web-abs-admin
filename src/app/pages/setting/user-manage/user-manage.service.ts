import { Injectable } from '@angular/core';
import {Api} from '../../../helpers/http/api';
import {ApiPath} from '../../../api-path';

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
}
