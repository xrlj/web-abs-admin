import { Injectable } from '@angular/core';
import {Api} from '../../../helpers/http/api';
import {ApiPath} from '../../../api-path';
import {VAppInfoReq} from '../../../helpers/vo/req/v-app-info-req';
import {Utils} from '../../../helpers/utils';

@Injectable({
  providedIn: 'root'
})
export class AppManageService {

  constructor(private api: Api, private utils: Utils) { }

  /**
   * 分页获取app列表。
   * @param body 查询条件
   */
  getAllPage(body: any): any {
    return this.api.post(ApiPath.usercentral.appInfoApi.getAllPage, body);
  }

  /**
   * 注册一个应用
   * @param vAppInfoReq 请求体。
   */
  registerAppInfo(vAppInfoReq: VAppInfoReq): any {
    return this.api.post(ApiPath.usercentral.appInfoApi.registerAppInfo, vAppInfoReq);
  }

  /**
   * 更新。
   * @param vAppInfoReq 请求体
   */
  update(vAppInfoReq: VAppInfoReq): any {
    return this.api.post(ApiPath.usercentral.appInfoApi.update, vAppInfoReq);
  }

  /**
   * 删除应用。
   * @param ids 要删除的多个应用。
   */
  delAppInfo(...ids: any[]): any {
    const idsPar = this.utils.arrayToArrayParam(ids);
    return this.api.delete(`${ApiPath.usercentral.appInfoApi.delAppInfo}/${idsPar}`);
  }

  /**
   * 获取详情。
   * @param appId 应用id。唯一
   */
  getAppInfoByAppId(appId: string): any {
    const path = `${ApiPath.usercentral.appInfoApi.getAppInfoByAppId}/${appId}`;
    return this.api.get(path);
  }
}
