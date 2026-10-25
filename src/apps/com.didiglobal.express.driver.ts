import { defineGkdApp } from '@gkd-kit/define';

export default defineGkdApp({
  id: 'com.didiglobal.express.driver',
  name: '滴滴送货司机',
  groups: [
    {
      key: 1,
      name: '权限提示-悬浮窗',
      desc: '点击[忽略]',
      rules: [
        {
          fastQuery: true,
          activityIds: '.v2.main.EDMainActivity',
          matches: '[text*="悬浮窗"] +n @[clickable=true] > [text="忽略"]',
          snapshotUrls: 'https://i.gkd.li/i/33427414',
        },
      ],
    },
    {
      key: 2,
      name: '其他-附近有新商户',
      desc: '点击[忽略]',
      rules: [
        {
          fastQuery: true,
          activityIds: '.v2.main.EDMainActivity',
          matches: '[text*="有新商户"] +n @[clickable=true] > [text="忽略"]',
          snapshotUrls: 'https://i.gkd.li/i/33427414',
          exampleUrls: 'https://e.gkd.li/fbbd9498-9140-40fe-a772-ba4613bfa9a4',
        },
      ],
    },
    {
      key: 3,
      name: '其他-开启自动接单?',
      desc: '点击[忽略]',
      rules: [
        {
          fastQuery: true,
          activityIds: '.v2.main.EDMainActivity',
          matches:
            '[text*="开启"][text*="自动接单"] +n @[clickable=true] > [text="忽略"]',
          snapshotUrls: 'https://i.gkd.li/i/33851087',
          exampleUrls: 'https://e.gkd.li/f3a0d6e2-8b2e-4b68-847d-6f6a6692ae08',
        },
      ],
    },
    {
      key: 4,
      name: '功能类-重复[刷新]导航',
      desc: '每隔3秒点击[刷新路线]',
      rules: [
        {
          fastQuery: true,
          actionCd: 3000,
          activityIds: '.v2.main.EDMainActivity',
          matches: '@[clickable=true] > [text="刷新路线"]',
          snapshotUrls: 'https://i.gkd.li/i/33917313',
          exampleUrls: 'https://e.gkd.li/684b4a64-1d41-4744-9b0c-0fe61dfbafe8',
        },
      ],
    },
    {
      key: 5,
      name: '局部广告-小悬浮窗',
      desc: 'x掉',
      rules: [
        {
          fastQuery: true,
          activityIds: '.v2.main.EDMainActivity',
          matches:
            'ImageView[width<86] < * < @[clickable=true] <2 [childCount=2][width<350] < ViewGroup < ViewGroup < FrameLayout < FrameLayout < FrameLayout < FrameLayout < [id="android:id/content"]',
          snapshotUrls: 'https://i.gkd.li/i/33917243',
          exampleUrls: 'https://e.gkd.li/dfc8c4b0-23bd-4163-8255-6f3e09c64fda',
        },
      ],
    },
    {
      key: 6,
      name: '通知提示-顶部横幅消息',
      desc: 'x掉',
      rules: [
        {
          fastQuery: true,
          activityIds: '.v2.main.EDMainActivity',
          matches:
            'ImageView < * < @[clickable=true] < [childCount>5][desc.length>20] <3 [childCount>10] < FrameLayout < FrameLayout < FrameLayout < FrameLayout < [id="android:id/content"]',
          snapshotUrls: 'https://i.gkd.li/i/33917290',
          exampleUrls: 'https://e.gkd.li/2381785a-ccc8-4fb8-9061-e0f1c559c4e9',
        },
      ],
    },
  ],
});
