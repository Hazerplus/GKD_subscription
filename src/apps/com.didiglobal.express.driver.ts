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
  ],
});
