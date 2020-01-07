export interface VUserReq {
  /**
   * 用户id。
   */
  userId?: string;
  /**
   * 用户名称
   */
  username?: string;
  /**
   * 密码
   */
  password?: string;
  /**
   * 性别
   */
  sex?: number;
  /**
   * 所属部门id
   */
  deptId?: string;
  /**
   * 真实姓名。
   */
  realName?: string;
  /**
   * 邮箱
   */
  email?: string;
  /**
   * 手机号码
   */
  mobile?: string;
  /**
   * 状态
   */
  status?: number;
}
