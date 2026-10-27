import { defineGkdApp } from '@gkd-kit/define';

export default defineGkdApp({
  id: 'cn.wanxue.newgaoshou',
  name: '海文考研',
  groups: [
    {
      key: 1,
      name: '功能类-[继续]用移动网络播放视频',
      desc: '点击[继续]',
      rules: [
        {
          fastQuery: true,
          activityIds: '.learn1.modules.player.VideoActivity',
          matches:
            '@[text="继续"] -n [vid="md_contentScrollView"] > [text*="移动网络"]',
          snapshotUrls: 'https://i.gkd.li/i/34022280',
          exampleUrls: 'https://e.gkd.li/7fb018c3-3842-4b44-bf41-add7c1f4c205',
        },
      ],
    },
  ],
});
