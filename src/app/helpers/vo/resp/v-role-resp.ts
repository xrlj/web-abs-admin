export interface VRoleResp {
  id: string; // 角色id
  roleName: string;
  description: string;
  dateCreated: string;
  disabled?: boolean;
  roleMenu?: VRoleMenuResp[];
  roleDept?: VRoleDeptResp[];
  rolePermission?: VRolePermissionResp[];
}

export interface VRoleMenuResp {
  roleId: string; // 角色id
  menuId: string;
  menuKey: string;
  checked: boolean;
}

export interface VRoleDeptResp {
  roleId: string; // 角色id
  deptId: string;
  deptKey: string;
  checked: boolean;
}

export interface VRolePermissionResp {
  roleId: string; // 角色id
  permissionId: string;
  permissionName: string;
}

