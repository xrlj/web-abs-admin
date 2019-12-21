import { Injectable } from '@angular/core';
import {Api} from '../../../helpers/http/api';
import {ApiPath} from '../../../api-path';
import {VDeptReq} from '../../../helpers/vo/req/v-dept-req';

@Injectable({
  providedIn: 'root'
})
export class DepartmentService {

  constructor(private api: Api) { }

  /**
   * 保存或者更新部门信息。
   * @param body 请求体
   */
  saveOrUpdate(body: VDeptReq): any {
    return this.api.post(ApiPath.usercentral.dept.saveOrUpdate, body);
  }

  del(deptId: string): any {
    return this.api.post(`${ApiPath.usercentral.dept.del}/${deptId}`);
  }

  /**
   * 获取全部部门列表。
   */
  getAll(): any {
    return this.api.get(ApiPath.usercentral.dept.getAll);
  }
}
