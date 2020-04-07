import {VPageReq} from './v-page-req';

export interface VEmailReq extends VPageReq {
  /**
   * 模板名称
   */
  templateName?: string;
  /**
   * 模板ID.
   */
  templateId?: string;
  /**
   * 收件人。
   */
  recipient?: string;
  /**
   * 状态。发送成功;发送失败
   */
  status?: number;
}
