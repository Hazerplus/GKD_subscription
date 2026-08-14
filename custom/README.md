# 自定义规则 Overlay

这里存放 Hazerplus 在上游 [`Lin-arm/GKD_subscription`](https://github.com/Lin-arm/GKD_subscription) 之外维护的规则。

## 新增或追加规则

在 `custom/apps/<Android 包名>.ts` 创建普通的 `defineGkdApp()` 文件。`apps/` 目录只允许放应用模块；没有自定义规则时该目录可以不存在。

- 上游不存在该应用：添加整个应用。
- 上游已存在该应用：默认把自定义规则组追加到上游应用。
- 追加时，规则组 key 和名称不得与上游重复。
- 自定义 app 的名称必须与上游一致，避免无意改名。

## 替换上游内容

只有确实需要覆盖上游行为时，才在 `overlay-policy.ts` 显式声明：

- `replaceGroups`：按 app id 和 group key 替换单个规则组，同时用 `expectedName` 防止上游悄悄改变 key 的含义；自定义组必须保留同一个 key，以延续 GKD 客户端的启用/禁用状态。
- `mode: 'replace'`：替换整个应用；必须用 `expectedAppName` 确认上游目标，谨慎使用。

目标被上游删除或改名后，构建会失败，不会静默覆盖错误规则。

## 本地校验与构建

```sh
pnpm install --frozen-lockfile
pnpm exec tsc --noEmit -p custom/tsconfig.json
pnpm exec tsx custom/merge-apps.test.ts
pnpm exec tsx custom/check.ts
pnpm exec tsx custom/build.ts
```

`@gkd-kit/tools` 继续校验最终订阅的重复 key/名称、快照 URL、选择器语法和分类。这里另行检查了自定义规则中“未设置 key 的规则掩盖后续重复 key/name”的情况。

选择器之间的语义重叠无法完全自动判断；新增规则时仍需结合 GKD 快照、Activity 范围和规则触发顺序审查。
