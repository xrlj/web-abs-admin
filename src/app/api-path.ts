const serviceauth = 'serviceauth'; // 服务名称
const usercentral = 'usercentral';

export const ApiPath = {
  login: `/${serviceauth}/auth/login`,
  logout: `/${serviceauth}/auth/invalidate`,
  usercentral: {
    userApi: {
      getUserMenus: `/${usercentral}/user/getUserMenus`,
    },
    menuApi: {
      saveOrUpdate: `/${usercentral}/menu/saveOrUpdate`,
      getMenusByClientId: `/${usercentral}/menu/getMenusByClientId`,
      delById: `/${usercentral}/menu/delById`,
      getById: `/${usercentral}/menu/getById`
    },
    appInfoApi: {
      getAll: `/${usercentral}/appInfo/getAll`
    }
  }
};
