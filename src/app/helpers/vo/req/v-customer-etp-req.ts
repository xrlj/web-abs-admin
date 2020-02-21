import {VPageReq} from './v-page-req';

export interface VCustomerEtpReq extends VPageReq {
  /**
   * 企业全称。
   */
  fullName?: string;
  /**
   * 企业编码。
   */
  etpCode?: string;
}
