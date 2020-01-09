export interface VRoleReq {
  enterpriseId: string;
  clientId?: string;
  roleId?: string;
  pageIndex?: number;
  pageSize?: number;
  menuIds?: string[];
  deptIds?: string[];
  roleName?: string;
  description?: string;
}
