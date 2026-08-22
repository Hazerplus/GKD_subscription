import { defineGkdApp } from '@gkd-kit/define';

export default defineGkdApp({
  id: 'com.xiaomi.mico',
  name: '小爱音箱',
  groups: [
    {
      key: 1000,
      name: '局部广告-音乐会员半屏弹窗',
      desc: '点击弹窗右上角关闭按钮',
      fastQuery: true,
      activityIds:
        'com.xiaomi.mico.hike.container.FlutterHostActivity$FlutterHostActivityDialog',
      rules: [
        {
          matches:
            '@ImageView[clickable=true][desc=null][visibleToUser=true][width<200 && height<200] - [desc^="到期按"][desc$="自动续费，可随时取消"]',
        },
      ],
    },
  ],
});
