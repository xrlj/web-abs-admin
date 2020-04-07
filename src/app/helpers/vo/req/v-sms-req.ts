import {VPageReq} from './v-page-req';

export interface VSmsReq extends VPageReq {
  /**
   * 短信编码。
   */
  smsCode?: string;
  /**
   * 短信发送手机号码。
   */
  sendMobile?: string;
  /**
   * 状态。
   */
  smsStatus?: number;
}
