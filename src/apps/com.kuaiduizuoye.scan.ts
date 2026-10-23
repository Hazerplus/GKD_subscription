import { defineGkdApp } from '@gkd-kit/define';

export default defineGkdApp({
  id: 'com.kuaiduizuoye.scan',
  name: '快对AI',
  groups: [
    {
      key: 1,
      name: '局部广告',
      desc: '点击[关闭]',
      rules: [
        {
          fastQuery: true,
          activityIds:
            '.activity.manyquestionsearch.activity.PicManySearchActivity',
          matches: '[width>700][height<300] >3 [text="关闭"][clickable=true]',
          snapshotUrls: 'https://i.gkd.li/i/33854308',
          exampleUrls: 'https://e.gkd.li/e81f7bbd-a5ce-4b57-b09a-185bd9529c9d',
        },
      ],
    },
  ],
});
