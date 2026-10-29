import { defineGkdApp } from '@gkd-kit/define';

export default defineGkdApp({
  id: 'com.android.updater',
  name: '系统更新',
  groups: [
    {
      key: 0,
      name: '功能类-不开启自动更新',
      fastQuery: true,
      matchTime: 10000,
      actionMaximum: 1,
      resetMatch: 'app',
      rules: [
        {
          activityIds: [
            '.MainActivity',
            '.UpdateActivity',
            '.NewVersionDialogActivity',
          ],
          matches: [
            '[vid="alertTitle"][text="开启智能更新" || text="开启自动下载" || text="Install automatically?"]',
            '[id="android:id/button2"][text="暂不开启" || text="取消" || text="No"]',
          ],
          snapshotUrls: [
            'https://i.gkd.li/i/15386937',
            'https://i.gkd.li/i/15386869',
            'https://i.gkd.li/i/18469146',
            'https://i.gkd.li/i/34107627',
          ],
        },
      ],
    },
    {
      key: 1,
      name: '功能类-流量更新点击继续下载',
      rules: [
        {
          fastQuery: true,
          activityIds: '.UpdateActivity',
          matches: [
            '[text^="您当前正在使用数据网络，继续下载可能会产生流量费用"]',
            '[text="继续下载"]',
          ],
          snapshotUrls: 'https://i.gkd.li/i/23182185',
        },
      ],
    },
    {
      key: 2,
      name: '功能类-不开启流量自动更新',
      rules: [
        {
          fastQuery: true,
          activityIds: '.UpdateActivity',
          matches: ['[text="开启数据网络自动下载"]', '[text="不开启"]'],
          snapshotUrls: 'https://i.gkd.li/i/23182175',
        },
      ],
    },
    {
      key: 3,
      name: '功能类-全屏系统更新弹窗',
      rules: [
        {
          fastQuery: true,
          activityIds: '.NewVersionDialogActivity',
          matches: [
            '[text^="发现系统新版本"]',
            '[text="稍后"][clickable=true]',
          ],
          snapshotUrls: 'https://i.gkd.li/i/34107628',
        },
      ],
    },
  ],
});
