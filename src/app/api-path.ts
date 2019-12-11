const serviceauth = 'serviceauth'; // 服务名称
const usercentral = 'usercentral';

export const ApiPath = {
  login: `/${serviceauth}/auth/login`,
  logout: `/${serviceauth}/auth/invalidate`,
  usercentral: {
    getUserMenus: `/${usercentral}/user/getUserMenus`,
    getMenusByClientId: `/${usercentral}/menu/getMenusByClientId/`,
    delById: `/${usercentral}/menu/delById`
  }
};
