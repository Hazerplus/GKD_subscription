import { defineGkdApp } from '@gkd-kit/define';

export default defineGkdApp({
  id: 'com.sfexpress.knight',
  name: '顺丰同城骑士',
  groups: [
    {
      key: 1,
      name: '功能类-重复[刷新]导航',
      desc: '每隔1秒点击[导航-取/送]上方刷新',
      rules: [
        {
          fastQuery: true,
          activityIds: [
            '.home.HomeActivity',
            '.redesign.detail.activity.ReOrderDetailActivity',
          ],
          matches:
            '@[vid="locationFl"] + [vid="recordFl"] >2 [text="导航-取" || text="导航-送"]',
          snapshotUrls: [
            'https://i.gkd.li/i/33796598',
            'https://i.gkd.li/i/33917309',
          ],
          exampleUrls: 'https://e.gkd.li/abae860f-12d0-4e01-92a4-6331adfd8cba',
        },
      ],
    },
    {
      key: 2,
      name: '功能类-自动[刷新]任务列表',
      desc: '每隔5秒点击1次[刷新列表]',
      rules: [
        {
          fastQuery: true,
          actionCd: 5000,
          action: 'clickCenter',
          activityIds: '.home.HomeActivity',
          matches: '@[vid="llRefresh"][clickable=true] >2 [text="刷新列表"]',
          snapshotUrls: 'https://i.gkd.li/i/33797305',
          exampleUrls: 'https://e.gkd.li/b381ce15-5a3d-43b2-9834-76ef62887a35',
        },
      ],
    },
  ],
});
