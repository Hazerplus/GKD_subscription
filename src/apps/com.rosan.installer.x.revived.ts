import { defineGkdApp } from '@gkd-kit/define';

export default defineGkdApp({
  id: 'com.rosan.installer.x.revived',
  name: 'InstallerX Revived',
  groups: [
    {
      key: 0,
      name: '其他-⚠️请移步软件包安装程序',
      desc: '请移步至软件包安装程序应用规则页',
      enable: false,
      rules: [{}],
    },
    {
      key: 1,
      name: '功能类-自动[确认]安装',
      desc: '点击[确认]',
      rules: [
        {
          fastQuery: true,
          activityIds: 'com.rosan.installer.ui.activity.InstallerActivity',
          matches:
            '[text="确认"] < @View[clickable=true] <n View < View[index=parent.childCount.minus(1)] -n [text="安装确认"] <n View < View < View < View < ViewGroup < [id="android:id/content"]',
          snapshotUrls: 'https://i.gkd.li/i/33545659',
          exampleUrls: 'https://e.gkd.li/71b051a6-c805-42d8-9c35-877044b92272',
        },
      ],
    },
  ],
});
