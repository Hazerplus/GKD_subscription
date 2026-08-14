import assert from 'node:assert/strict';
import type { RawApp, RawAppGroup } from '@gkd-kit/api';
import { OPEN_AD_ORDER } from '../src/globalGroups';
import { mergeApps } from './merge-apps';

const group = (
  key: number,
  name: string,
  rules: RawAppGroup['rules'] = '[text="test"]',
): RawAppGroup => ({ key, name, rules });

const app = (id: string, groups: RawAppGroup[], name = id): RawApp => ({
  id,
  name,
  groups,
});

const expectError = (fn: () => unknown, message: RegExp) => {
  assert.throws(fn, message);
};

{
  const upstream = [app('com.example', [group(1, '开屏广告')])];
  const custom = [app('com.example', [group(10_000, '功能类-自定义')])];
  const merged = mergeApps(upstream, custom, {});
  assert.deepEqual(
    merged[0].groups.map((item) => item.key),
    [1, 10_000],
  );
  assert.equal(upstream[0].groups.length, 1, 'must not mutate upstream');
}

{
  const upstream = [app('com.example', [group(1, '更新提示')])];
  const custom = [app('com.example', [group(1, '更新提示-个人版')])];
  const merged = mergeApps(upstream, custom, {
    'com.example': {
      replaceGroups: [{ key: 1, expectedName: '更新提示' }],
    },
  });
  assert.equal(merged[0].groups.length, 1);
  assert.equal(merged[0].groups[0].name, '更新提示-个人版');
}

{
  const customOnly = app('com.custom', [group(0, '功能类-新应用')]);
  assert.deepEqual(mergeApps([], [customOnly], {}), [customOnly]);
}

{
  const upstream = [app('com.example', [group(1, '更新提示')], '旧名称')];
  const custom = [
    app('com.example', [group(0, '功能类-整应用替换')], '新名称'),
  ];
  const merged = mergeApps(upstream, custom, {
    'com.example': { mode: 'replace', expectedAppName: '旧名称' },
  });
  assert.deepEqual(merged, custom);
}

{
  const custom = [app('com.custom', [group(0, '开屏广告-自定义')])];
  const merged = mergeApps([], custom, {});
  assert.equal(merged[0].groups[0].order, OPEN_AD_ORDER);
}

expectError(
  () =>
    mergeApps(
      [app('com.example', [group(1, '更新提示')])],
      [app('com.example', [group(1, '功能类-key 冲突')])],
      {},
    ),
  /key collides/,
);

expectError(
  () =>
    mergeApps(
      [app('com.example', [group(1, '更新提示')])],
      [app('com.example', [group(10_000, '更新提示')])],
      {},
    ),
  /name collides/,
);

expectError(
  () =>
    mergeApps(
      [app('com.example', [group(1, '更新提示')])],
      [app('com.example', [group(1, '更新提示-个人版')])],
      {
        'com.example': {
          replaceGroups: [{ key: 1, expectedName: '已被上游改名' }],
        },
      },
    ),
  /target changed upstream/,
);

expectError(
  () =>
    mergeApps(
      [app('com.example', [group(1, '更新提示')])],
      [app('com.example', [group(10_000, '功能类-无对应替换组')])],
      {
        'com.example': {
          replaceGroups: [{ key: 1, expectedName: '更新提示' }],
        },
      },
    ),
  /no custom group/,
);

expectError(
  () =>
    mergeApps(
      [],
      [
        app('com.custom', [
          group(0, '功能类-重复规则 key', [
            { matches: '[text="unkeyed"]' },
            { key: 1, matches: '[text="first"]' },
            { key: 1, matches: '[text="second"]' },
          ]),
        ]),
      ],
      {},
    ),
  /Duplicate defined custom rule key/,
);

console.log('Custom overlay tests passed.');
