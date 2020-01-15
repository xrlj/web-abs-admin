import {VPageReq} from './v-page-req';

export interface VUserSearchReq extends VPageReq {
  /**
   * 用户id
   */
  userId?: string;
  /**
   * 是否只查询一级用户。
   */
  isRootUser?: boolean;
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
  /**
   * 企业id。
   */
  etpId?: string;
}
