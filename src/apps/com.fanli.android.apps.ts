import { defineGkdApp } from '@gkd-kit/define';

export default defineGkdApp({
  id: 'com.fanli.android.apps',
  name: '返利',
  groups: [
    {
      key: 1,
      name: '全屏广告-弹窗广告',
      desc: '点击关闭',
      matchTime: 10000,
      actionMaximum: 1,
      resetMatch: 'app',
      fastQuery: true,
      activityIds:
        'com.fanli.android.module.webview.ui.activity.TransparentBrowserInnerActivity',
      rules: [
        {
          key: 0,
          matches:
            '@[desc="closewv"][visibleToUser=true] <<n [vid="webviewContainer"]',
          exampleUrls: 'https://e.gkd.li/7e013a50-4f55-4f49-8024-7dd749e8d53d',
          snapshotUrls: 'https://i.gkd.li/i/13245808',
        },
        {
          key: 1,
          matches:
            ' @View[desc="javascript:void(0);"][clickable=true] -3 TextView[text!=null] < View[childCount=4] <<2 WebView <<2 [vid="webviewContainer"]',
          exampleUrls: 'https://e.gkd.li/47c6d3bf-7cff-4462-9288-1be6d2368f99',
          snapshotUrls: 'https://i.gkd.li/i/33924810',
        },
      ],
    },

    {
      key: 2,
      name: '权限提示-通知',
      fastQuery: true,
      activityIds: 'com.fanli.android.module.main.activity.PanoMainActivity',
      rules: [
        {
          matches:
            'ImageView[vid=null][width<68 && height<68] < @FrameLayout[childCount=1] < * - RelativeLayout > [text="开启提醒"][visibleToUser=true]',
          snapshotUrls: 'https://i.gkd.li/i/33924577',
          exampleUrls: 'https://e.gkd.li/061779d2-fb8c-43a1-80ac-11e36deaab83',
        },
      ],
    },
  ],
});
