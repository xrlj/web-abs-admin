export interface VAppInfoResp {
  id: string;
  appId: string;
  appName: string;
  appSecret: string;
  checkStatus: number;
  appType: number;
  description: string;
  disabled?: boolean;
}
