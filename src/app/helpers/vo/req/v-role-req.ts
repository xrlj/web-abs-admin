export interface VRoleReq {
  roleId?: string;
  pageIndex?: number;
  pageSize?: number;
  clientId: string;
  menuIds?: string[];
  roleName?: string;
  description?: string;
}
