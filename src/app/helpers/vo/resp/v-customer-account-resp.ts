export interface VCustomerAccountResp {
  /**
   * 企业id。
   */
  id: string;
  /**
   * 账号名称。
   */
  username: string;
  /**
   * 真实姓名。
   */
  realName: string;
  /**
   * 企业全称。
   */
  etpFullName: string;
  /**
   * 账户手机号码。
   */
  mobile: string;
  /**
   * 账号状态。
   */
  userStatus: number;
  /**
   * 账号状态名称。
   */
  userStatusName: string;
  /**
   * 创建时间。
   */
  dateCreated: string;
  /**
   * 选择状态。
   */
  disabled?: boolean;
}
