export interface VUserResp {
  /**
   * 用户id。
   */
  userId: string;
  /**
   * 用户所属企业id。没有为0
   */
  eptId: string;
  /**
   * 所属部门id。
   */
  deptId: string;
  /**
   * 部门名称。
   */
  deptName: string;
  /**
   * 登录用户名
   */
  username: string;
  /**
   * 用户类型。
   */
  userType: number;
  /**
   * 性别。
   */
  sexType: number;
  /**
   * 姓名名称。
   */
  sexTypeName: string;
  /**
   * 个人认证账号。
   */
  accoutId: string;
  /**
   * 真实姓名。
   */
  realName: string;
  /**
   * 创建时间。
   */
  dateCreated: string;
  /**
   * 电子邮箱。
   */
  email: string;
  /**
   * 注册手机号码。
   */
  mobile: string;
  /**
   * 用户状态。
   */
  status: number;
  /**
   * 状态名称。
   */
  statusName: string;
  disabled?: boolean;
}
