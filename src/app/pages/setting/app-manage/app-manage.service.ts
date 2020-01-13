import { Injectable } from '@angular/core';
import {Api} from '../../../helpers/http/api';
import {ApiPath} from '../../../api-path';

@Injectable({
  providedIn: 'root'
})
export class AppManageService {

  constructor(private api: Api) { }

  /**
   * 分页获取app列表。
   * @param body 查询条件
   */
  getAllPage(body: any): any {
    return this.api.post(ApiPath.usercentral.appInfoApi.getAllPage, body);
  }
}
