# Hazerplus 的 GKD 订阅

这是基于 [`Lin-arm/GKD_subscription`](https://github.com/Lin-arm/GKD_subscription) 持续同步的个人 GKD 订阅，并通过隔离的自定义 Overlay 增加或替换规则。

## 订阅地址

```text
https://raw.githubusercontent.com/Hazerplus/GKD_subscription/main/custom-dist/gkd.json5
```

版本检查文件：

```text
https://raw.githubusercontent.com/Hazerplus/GKD_subscription/main/custom-dist/gkd.version.json5
```

> 首次切换时建议暂时保留原订阅，确认新订阅可以拉取、更新和正常触发后，再停用旧订阅。

## 维护方式

- 上游源码和上游 `dist/` 保持原样，便于同步和审计。
- 个人规则位于 [`custom/`](./custom/README.md)。
- 最终订阅输出到 `custom-dist/`，使用独立订阅 ID 和版本序列。
- 默认追加规则；替换上游规则必须显式声明目标 key 和预期名称。
- CI 会检查 key/名称冲突、失效替换目标、GKD 选择器、快照链接和分类。

## 自动同步与安全边界

- `sync-upstream` 每天北京时间 05:30 检查上游，晚于上游计划发布时间约 2.5 小时。
- `README.md`、`.github/workflows/`、`custom/` 和 `custom-dist/` 由本 fork 管理，同步时不会被上游覆盖。
- 上游 workflow 一旦变化，定时同步会停止并创建 Issue；人工审查后才能显式确认该变化并继续。
- 其余 Git 冲突、构建失败、规则冲突或索引完整性异常同样会停止推送并创建 Issue，不会静默覆盖自定义规则。
- 上游继承的发布、自动修复、Issue 和 PR 工作流已保留为只读占位并禁用；有效工作流只有本 fork 的只读校验和受控同步。
- Actions 使用精确权限、固定 action commit；执行合并后的上游代码时不持久化可写 Git 凭据。

## 本地构建

需要 Node.js 22+ 和 pnpm：

```sh
pnpm install --frozen-lockfile
pnpm exec tsc --noEmit -p custom/tsconfig.json
pnpm exec tsx custom/merge-apps.test.ts
pnpm exec tsx custom/check.ts
pnpm exec tsx custom/build.ts
```

## 上游与授权说明

规则主体来源于 [`Lin-arm/GKD_subscription`](https://github.com/Lin-arm/GKD_subscription)，本仓库保留 GitHub fork 关系和上游署名。

截至本 fork 建立时，上游仓库没有声明 `LICENSE` 文件，因此本仓库不会替上游宣称一个未声明的开源许可证。个人自定义部分同样暂不单独声明许可；如需再分发或商业使用，应先确认相应规则内容的授权条件。
