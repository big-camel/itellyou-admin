export default [
  {
    path: '/login',
    component: '../layouts/UserLayout',
    routes: [
      {
        name: 'login',
        path: '/login',
        component: './login',
      },
    ],
  },
  {
    path: '/',
    component: '../layouts/BasicLayout',
    access: 'adminLogin',
    wrappers: ['@/wrappers/auth'],
    routes: [
      {
        path: '/',
        redirect: '/home',
      },
      {
        path: '/home',
        name: 'home',
        icon: 'smile',
        component: './home',
      },
      {
        name: 'user.manager',
        icon: 'user',
        path: '/user',
        routes: [
          {
            path: 'list',
            name: 'list',
            access: 'adminUserList',
            component: './user/list',
          },
          {
            path: 'rank',
            name: 'rank',
            access: 'adminUserRankList',
            component: './user/rank',
          },
          {
            path: 'credit',
            name: 'credit',
            access: 'adminUserBankCreditConfig',
            component: './user/credit',
          },
          {
            path: 'score',
            name: 'score',
            access: 'adminUserBankScoreConfig',
            component: './user/score',
          },
        ],
      },
      {
        name: 'tag.manager',
        icon: 'tag',
        path: '/tag',
        routes: [
          {
            path: 'list',
            name: 'list',
            component: './tag/list',
          },
          {
            path: 'group',
            name: 'group',
            component: './tag/group',
          },
        ],
      },
      {
        name: 'finance.manager',
        icon: 'account-book',
        path: '/finance',
        routes: [
          {
            path: 'income',
            name: 'income',
            routes:[
                {
                    path: 'list',
                    name: 'list',
                    component: './finance/income',
                },
                {
                    path: 'config',
                    name: 'config',
                    component: './finance/income/config',
                },
                {
                  path: 'tip/config',
                  name: 'tip.config',
                  component: './finance/income/tip/config',
                }
            ]
          }
        ],
      },
      {
        name: 'system',
        icon: 'robot',
        path: '/system',
        routes: [
          {
            path: 'permission',
            name: 'permission',
            access: 'adminSystemPermissionList',
            component: './system/permission',
          },
          {
            path: 'role',
            name: 'role',
            access: 'adminSystemRoleList',
            component: './system/role',
          },
          {
            path: 'setting',
            name: 'setting',
            access: 'adminSysSettingEdit',
            component: './system/setting',
          },
          {
            path: 'link',
            name: 'link',
            component: './system/link',
          },
          {
            path: 'ad',
            name: 'ad',
            routes:[
                {
                    path: 'list',
                    name: 'list',
                    component: './system/ad',
                },
                {
                    path: 'slot',
                    name: 'slot',
                    component: './system/ad/slot',
                }
            ]
          },
        ],
      },
      {
        component: './404',
      },
    ],
  },
  {
    component: './404',
  },
  {
    component: './403',
  },
  {
    component: './500',
  },
  {
    component: './404',
  },
];
