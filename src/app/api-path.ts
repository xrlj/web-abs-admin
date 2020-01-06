const serviceauth = 'serviceauth'; // 服务名称
const usercentral = 'usercentral';

export const ApiPath = {
  login: `/${serviceauth}/auth/login`,
  logout: `/${serviceauth}/auth/invalidate`,
  usercentral: {
    userApi: {
      getUserMenus: `/${usercentral}/user/getUserMenus`,
      addSystemUser: `/${usercentral}/user/addSystemUser`,
      getEtpUsers: `/${usercentral}/user/getEtpUsers`,
      exitUsername: `/${usercentral}/user/exitUsername`,
      updateUserStatus: `/${usercentral}/user/updateUserStatus`
    },
    menuApi: {
      saveOrUpdate: `/${usercentral}/menu/saveOrUpdate`,
      getMenusByClientId: `/${usercentral}/menu/getMenusByClientId`,
      delById: `/${usercentral}/menu/delById`,
      getById: `/${usercentral}/menu/getById`
    },
    appInfoApi: {
      getAll: `/${usercentral}/appInfo/getAll`
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
    }
  }
};
