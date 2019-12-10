const serviceauth = 'serviceauth'; // auth服务在网关中的名称
const usercentral = 'usercentral';

export const ApiPath = {
  login: `/${serviceauth}/auth/login`,
  logout: `/${serviceauth}/auth/invalidate`,
  usercentral: {
    getUserMenus: `/${usercentral}/user/getUserMenus`,
    getMenusByClientId: `/${usercentral}/menu/getMenusByClientId/`
  }
};
