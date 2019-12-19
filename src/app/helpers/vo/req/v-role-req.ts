export interface VRoleReq {
  pageIndex?: number;
  pageSize?: number;
  clientId: string;
  menuIds?: string[];
  roleName?: string;
  description?: string;
}
