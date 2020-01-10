export interface VUserPwdReq {
  /**
   * 用户id。
   */
  userId: string;
  /**
   * 旧密码
   */
  oldPassword: string;
  /**
   * 新密码
   */
  password: string;
  /**
   * 确认新密码
   */
  confirmPassword: string;
}
