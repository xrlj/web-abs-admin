const serviceauth = 'serviceauth'; // 服务名称
const usercentral = 'usercentral';
const sysfilesystem = 'sysfilesystem'; // 文件系统服务

export const ApiPath = {
  login: `/${serviceauth}/auth/sysLogin`,
  logout: `/${serviceauth}/auth/invalidate`,
  usercentral: {
    userApi: {
      getUserMenus: `/${usercentral}/user/getUserMenus`,
      addSystemUser: `/${usercentral}/user/addSystemUser`,
      updateSystemUser: `/${usercentral}/user/updateSystemUser`,
      getUserCanSelectRoles: `/${usercentral}/user/getUserCanSelectRoles`,
      getRolesByUserId: `/${usercentral}/user/getRolesByUserId`,
      addUserRoles: `/${usercentral}/user/addUserRoles`,
      getUserList: `/${usercentral}/user/getUserList`,
      exitUsername: `/${usercentral}/user/exitUsername`,
      updateUserStatus: `/${usercentral}/user/updateUserStatus`,
      delUser: `/${usercentral}/user/delUser`,
      getUserInfoById: `/${usercentral}/user/getUserInfoById`,
      updateUserPassword: `/${usercentral}/user/updateUserPassword`,
      resetUserPassword: `/${usercentral}/user/resetUserPassword`
    },
    menuApi: {
      saveOrUpdate: `/${usercentral}/menu/saveOrUpdate`,
      getMenusByClientId: `/${usercentral}/menu/getMenusByClientId`,
      delById: `/${usercentral}/menu/delById`,
      getById: `/${usercentral}/menu/getById`
    },
    appInfoApi: {
      getAll: `/${usercentral}/appInfo/getAll`,
      getAllPage: `/${usercentral}/appInfo/getAllPage`,
      registerAppInfo: `/${usercentral}/appInfo/registerAppInfo`,
      update: `/${usercentral}/appInfo/update`,
      delAppInfo: `/${usercentral}/appInfo/delAppInfo`,
      getAppInfoByAppId: `/${usercentral}/appInfo/getAppInfoByAppId`
    },
    roleApi: {
      getAll: `/${usercentral}/role/getAll`,
      save: `/${usercentral}/role/save`,
      update: `/${usercentral}/role/update`,
      getById: `/${usercentral}/role/getById`,
      del: `/${usercentral}/role/del`,
      getAllRoleByDeptId: `/${usercentral}/role/getAllRoleByDeptId`
    },
    dept: {
      saveOrUpdate: `/${usercentral}/dept/saveOrUpdate`,
      del: `/${usercentral}/dept/del`,
      getById: `/${usercentral}/dept/getById`,
      getAll: `/${usercentral}/dept/getAll`
    },
    rolePermissions: {
      addPermission: `/${usercentral}/rolePermissions/addPermission`,
      updatePermission: `/${usercentral}/rolePermissions/updatePermission`,
      getPermissionById: `/${usercentral}/rolePermissions/getPermissionById`,
      getPermissionListPage: `/${usercentral}/rolePermissions/getPermissionListPage`,
      delPermission: `/${usercentral}/rolePermissions/delPermission`
    }
  },
  sysfilesystem: {
    sysFiles: {
      uploadFile: `/${sysfilesystem}/sysFiles/uploadFile`
    }
  }
};
