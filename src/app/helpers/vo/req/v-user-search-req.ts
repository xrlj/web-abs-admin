import {VPageReq} from './v-page-req';

export interface VUserSearchReq extends VPageReq {
  /**
   * 用户名称
   */
  username?: string;
  /**
   * 性别
   */
  sex?: number;
  /**
   * 所属部门id
   */
  deptId?: string;
}
