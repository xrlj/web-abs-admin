import { Injectable } from '@angular/core';
import {Api} from '../../../helpers/http/api';
import {ApiPath} from '../../../api-path';

@Injectable({
  providedIn: 'root'
})
export class MenuManageService {

  constructor(private api: Api) { }

  /**
   * 根据clientId获取该应用下所有菜单。
   * @param clientId 应用id。
   */
  getMenusByClientId(clientId: string): any {
    return this.api.get(`${ApiPath.usercentral.getMenusByClientId}/${clientId}`);
  }
}
