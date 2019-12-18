export interface VRoleReq {
  pageIndex: number;
  pageSize: number;
  clientId: string;
  roleName?: string;
  description?: string;
}
