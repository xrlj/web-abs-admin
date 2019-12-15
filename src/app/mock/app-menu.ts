// 目前仅支持三级目录
export const APP_MENUS = [
  {
    title: '首页',
    icon: 'home',
    link: '/pages'
  },
  {
    title: '用户管理',
    icon: 'user',
    children: [
      { title: '企业管理', link: '/pages/navigation/affix' },
      { title: '会员管理', link: '/pages/navigation/breadcrumb' }
    ]
  },
  {
    title: '贷前管理',
    icon: 'eye',
    children: [
      { title: '授信协议管理', link: '/abd' },
      { title: '转让合同管理', link: '/sdfsdf' },
      { title: '产品管理', link: '/adf/sdf' }
    ]
  },
  {
    title: '贷中管理',
    icon: 'bank',
    children: [
      { title: '可融资数据', link: '/df/dsfa' },
      { title: '转让管理', link: '/sdf/aaa' }
    ]
  },
  {
    title: '贷后管理',
    icon: 'insurance',
    children: [
      { title: '资产管理', link: '/ff/afsdffix' },
      { title: '中登网登记', link: '/df/afsdfsdfix' },
      { title: '银行流水登记', link: '/df/das' },
      { title: '汇款核销', link: '/safdsd/affdfdix' },
      { title: '客户台账', link: '/sdf/fdsf' }
    ]
  },
  {
    title: '票据管理',
    icon: 'database',
    children: [
      { title: '票据录入', link: '/dsf/dfds' },
      { title: '票据列表', link: '/sdaf/grs' }
    ]
  },
  {
    title: '合同管理',
    icon: 'book',
    children: [
      { title: '票据录入', link: '/fdg/fgds' },
      { title: '票据列表', link: '/f/fg' }
    ]
  },
  {
    title: '报表统计',
    icon: 'bar-chart',
    children: [
      { title: '票据录入', link: '/fds/affdfsgreix' },
      { title: '票据列表', link: '/gggg/bresssadcrumb' }
    ]
  },
  {
    title: '基础管理',
    icon: 'box-plot',
    children: [
      { title: '产品类型管理', link: '/dd/adsf' }
    ]
  },
  {
    title: '系统管理',
    icon: 'setting',
    children: [
      { title: '用户管理', link: '/ddd/affix' },
      { title: '部门管理', link: '/daa/dropdown' },
      { title: '角色管理', link: '/daa/breadcrumb' },
      { title: '权限管理', link: '/navadfigation/dropdown' },
      { title: '菜单管理', link: '/pages/setting/menu' },
      { title: '应用管理', link: '/nadfvigation/menu' }
    ]
  }
];
