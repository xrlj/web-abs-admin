export interface VAppInfoReq {
  /**
   * 应用id
   */
  id?: string;
  /**
   * 用户id。
   */
  userId?: string;
  /**
   * 应用名称。
   */
  appName?: string;
  /**
   * 应用描述
   */
  description?: string;
  /**
   * 客户端设备类型。
   */
  clientDeviceType?: string;
  /**
   * 应用类型。
   */
  appType?: number;
}
