export interface VCustomerEtpResp {
  /**
   * 企业id。
   */
  id: string;
  /**
   * 企业编码。
   */
  etpCode: string;
  /**
   * 企业全称。
   */
  fullName: string;
  /**
   * 企业联系人。
   */
  linkName: string;
  /**
   * 企业联系人电话。
   */
  linkMobile: string;
  /**
   * 企业状态
   */
  etpStatus: number;
  /**
   * 企业状态名称。
   */
  etpStatusName: string;
  /**
   * 创建时间。
   */
  dateCreated: string;
  /**
   * 选择状态。
   */
  disabled?: boolean;
}
