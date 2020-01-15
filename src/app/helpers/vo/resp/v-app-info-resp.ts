export interface VAppInfoResp {
  id: string;
  appId: string;
  appName: string;
  appSecret: string;
  checkStatus: number;
  appTypeValue: number;
  appTypeName: string;
  description: string;
  disabled?: boolean;
}
