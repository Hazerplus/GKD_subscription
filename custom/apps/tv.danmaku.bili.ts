import { defineGkdApp } from '@gkd-kit/define';

export default defineGkdApp({
  id: 'tv.danmaku.bili',
  name: '哔哩哔哩',
  groups: [
    {
      key: 1000,
      name: '局部广告-视频详情页UP主推荐广告',
      desc: '点击广告卡片右上角关闭按钮',
      fastQuery: true,
      activityIds: 'com.bilibili.ship.theseus.detail.UnitedBizDetailsActivity',
      rules: [
        {
          matches:
            '@View[desc="close"][visibleToUser=true] < View[clickable=true] - View[clickable=true] > View[desc="dislike"]',
        },
      ],
    },
  ],
});
