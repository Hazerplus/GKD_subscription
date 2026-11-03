import { defineGkdApp } from '@gkd-kit/define';

export default defineGkdApp({
  id: 'com.android.permissioncontroller',
  name: '权限控制器',
  groups: [
    {
      key: 1000,
      name: '权限提示-Telegram追加照片和视频权限',
      desc: '仅在 Telegram 请求访问更多照片和视频时点击[拒绝]，不处理其他应用或其他权限',
      fastQuery: true,
      actionMaximum: 1,
      resetMatch: 'app',
      forcedTime: 6000,
      rules: [
        {
          // 本地快照 1793684511105，未提供公开快照链接，Activity 为 null。
          matches: [
            '[vid="alertTitle"][text="允许“Telegram”访问更多照片和视频？"][visibleToUser=true]',
            '[vid="parentPanel"] > [vid="buttonPanel"] > @[text="拒绝"][clickable=true][visibleToUser=true] + [text="选择部分"] + [text="允许访问全部"]',
          ],
        },
      ],
    },
  ],
});
