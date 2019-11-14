// 目前仅支持三级目录
export const APP_MENUS = [
  {
    title: '首页',
    icon: 'dashboard',
    link: '/'
  },
  {
    title: '会员管理',
    icon: 'appstore',
    children: [
      { title: '企业管理', link: '/navigation/affix' },
      { title: '会员管理', link: '/navigation/breadcrumb' }
    ]
  },
  {
    title: '产品管理',
    icon: 'appstore',
    children: [
      { title: '产品列表', link: '/navigation/affix' }
    ]
  },
  {
    title: '融资管理',
    icon: 'box-plot',
    children: [
      { title: '可融资数据', link: '/navigation/affix' },
      { title: '受让应收账款', link: '/navigation/affix' }
    ]
  },
  {
    title: '资产管理',
    icon: 'box-plot',
    children: [
      { title: '资产列表', link: '/navigation/affix' }
    ]
  },
  {
    title: '基础管理',
    icon: 'box-plot',
    children: [
      { title: '产品类型管理', link: '/navigation/affix' }
    ]
  },
  {
    title: '系统管理',
    icon: 'box-plot',
    children: [
      { title: '系统用户管理', link: '/navigation/affix' },
      { title: '部门管理', link: '/navigation/dropdown' },
      { title: '角色管理', link: '/navigation/breadcrumb' },
      { title: '权限管理', link: '/navigation/dropdown' },
      { title: '菜单管理', link: '/navigation/menu' },
      { title: '应用管理', link: '/navigation/menu' }
    ]
  }
];
