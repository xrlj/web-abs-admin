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
   * @param type 菜单类型。0-获取所有菜单和按钮;1-菜单; 2-按钮
   */
  getMenusByClientId(clientId: string, type: number): any {
    return this.api.get(`${ApiPath.usercentral.getMenusByClientId}/${clientId}/${type}`);
  }

  delMenuById(menuId: string): any {
    const par = {
      id: menuId
    };
    const path = ApiPath.usercentral.delById;
    console.log(path);
    return this.api.post(ApiPath.usercentral.delById, par);
  }
}
