import { defineGkdApp } from '@gkd-kit/define';

export default defineGkdApp({
  id: 'com.byyoung.setting',
  name: '爱玩机工具箱',
  groups: [
    {
      key: 1,
      name: '功能类-忽略授权提示',
      desc: '初始授权欢迎界面,点击上方暂时忽略授权',
      matchTime: 10000,
      actionMaximum: 1,
      resetMatch: 'app',
      rules: [
        {
          fastQuery: true,
          actionDelay: 200,
          activityIds: '.Welcome.PermissionActivity',
          matches: '@[clickable=true] >2 [text*="忽略授权"]',
          snapshotUrls: 'https://i.gkd.li/i/34113480',
          exampleUrls: 'https://e.gkd.li/3685c49e-516e-4e15-b33a-419459cc311a',
        },
      ],
    },
    {
      key: 2,
      name: '功能类-每日自动签到',
      fastQuery: true,
      activityIds: '.HomePage.activitys.MainActivity',
      actionDelay: 3000, // 等待3秒，确保页面(后台)加载完成
      rules: [
        {
          matches: '[vid="userIsLogin"] >2 [text="签到"]', // 尝试不进个人页直接签到
          snapshotUrls: 'https://i.gkd.li/i/27209865',
          exampleUrls: 'https://e.gkd.li/febcaadd-d766-4970-b8ee-edbccf4022ac',
        },
      ],
    },
  ],
});
