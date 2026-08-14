import type { RawApp, RawAppGroup, RawAppRule } from '@gkd-kit/api';
import { OPEN_AD_ORDER } from '../src/globalGroups';
import type { AppOverlayPolicy, GroupTarget } from './overlay-policy';

const cloneGroup = (group: RawAppGroup): RawAppGroup => ({
  ...group,
  rules: Array.isArray(group.rules) ? [...group.rules] : group.rules,
});

const cloneApp = (app: RawApp): RawApp => ({
  ...app,
  groups: app.groups.map(cloneGroup),
});

const normalizeCustomApp = (app: RawApp): RawApp => ({
  ...app,
  groups: app.groups.map((group) => ({
    ...cloneGroup(group),
    ...(group.name.startsWith('开屏广告') ? { order: OPEN_AD_ORDER } : {}),
  })),
});

const assertUnique = <T>(
  items: readonly T[],
  value: (item: T) => string | number,
  label: string,
) => {
  const seen = new Set<string | number>();
  for (const item of items) {
    const current = value(item);
    if (seen.has(current)) {
      throw new Error(`Duplicate ${label}: ${JSON.stringify(current)}`);
    }
    seen.add(current);
  }
};

const objectRules = (group: RawAppGroup): RawAppRule[] =>
  (Array.isArray(group.rules) ? group.rules : [group.rules]).filter(
    (rule): rule is RawAppRule => typeof rule !== 'string',
  );

const assertUniqueDefinedRuleField = (
  rules: RawAppRule[],
  field: 'key' | 'name',
  appId: string,
  group: RawAppGroup,
) => {
  const seen = new Set<string | number>();
  for (const rule of rules) {
    const current = rule[field];
    if (current === undefined) continue;
    if (seen.has(current)) {
      throw new Error(
        `Duplicate defined custom rule ${field}: app=${appId}, group=${group.key}, value=${JSON.stringify(current)}`,
      );
    }
    seen.add(current);
  }
};

const validateCustomApp = (app: RawApp) => {
  assertUnique(
    app.groups,
    (group) => group.key,
    `custom group key in ${app.id}`,
  );
  assertUnique(
    app.groups,
    (group) => group.name,
    `custom group name in ${app.id}`,
  );
  for (const group of app.groups) {
    const rules = objectRules(group);
    assertUniqueDefinedRuleField(rules, 'key', app.id, group);
    assertUniqueDefinedRuleField(rules, 'name', app.id, group);
  }
};

const replacementMap = (targets: readonly GroupTarget[] = []) => {
  assertUnique(targets, (target) => target.key, 'replacement group key');
  return new Map(targets.map((target) => [target.key, target]));
};

export const mergeApps = (
  upstreamApps: RawApp[],
  customApps: RawApp[],
  policy: Record<string, AppOverlayPolicy>,
): RawApp[] => {
  assertUnique(customApps, (app) => app.id, 'custom app id');
  customApps.forEach(validateCustomApp);

  const customAppIds = new Set(customApps.map((app) => app.id));
  for (const appId of Object.keys(policy)) {
    if (!customAppIds.has(appId)) {
      throw new Error(`Overlay policy has no matching custom app: ${appId}`);
    }
  }

  const result = upstreamApps.map(cloneApp);
  const appIndexes = new Map(result.map((app, index) => [app.id, index]));

  for (const sourceCustomApp of customApps) {
    const customApp = normalizeCustomApp(sourceCustomApp);
    const upstreamIndex = appIndexes.get(customApp.id);
    const appPolicy = policy[customApp.id];

    if (upstreamIndex === undefined) {
      if (appPolicy?.mode === 'replace') {
        throw new Error(
          `Whole-app replacement target does not exist upstream: ${customApp.id}`,
        );
      }
      if (appPolicy?.replaceGroups?.length) {
        throw new Error(
          `Group replacement target app does not exist upstream: ${customApp.id}`,
        );
      }
      result.push(customApp);
      appIndexes.set(customApp.id, result.length - 1);
      continue;
    }

    const upstreamApp = result[upstreamIndex];
    if (appPolicy?.mode === 'replace') {
      if (upstreamApp.name !== appPolicy.expectedAppName) {
        throw new Error(
          `Whole-app replacement target changed upstream: app=${customApp.id}, expected=${JSON.stringify(appPolicy.expectedAppName)}, actual=${JSON.stringify(upstreamApp.name)}`,
        );
      }
      result[upstreamIndex] = customApp;
      continue;
    }

    if (
      customApp.name !== undefined &&
      upstreamApp.name !== undefined &&
      customApp.name !== upstreamApp.name
    ) {
      throw new Error(
        `Append overlay cannot rename an upstream app: app=${customApp.id}, upstream=${JSON.stringify(upstreamApp.name)}, custom=${JSON.stringify(customApp.name)}`,
      );
    }

    const replacements = replacementMap(appPolicy?.replaceGroups);
    const consumed = new Set<number>();

    for (const customGroup of customApp.groups) {
      const target = replacements.get(customGroup.key);
      if (target) {
        const targetIndex = upstreamApp.groups.findIndex(
          (group) => group.key === target.key,
        );
        if (targetIndex < 0) {
          throw new Error(
            `Replacement target group does not exist upstream: app=${customApp.id}, group=${target.key}`,
          );
        }
        const upstreamGroup = upstreamApp.groups[targetIndex];
        if (upstreamGroup.name !== target.expectedName) {
          throw new Error(
            `Replacement target changed upstream: app=${customApp.id}, group=${target.key}, expected=${JSON.stringify(target.expectedName)}, actual=${JSON.stringify(upstreamGroup.name)}`,
          );
        }
        upstreamApp.groups[targetIndex] = customGroup;
        consumed.add(target.key);
        continue;
      }

      if (upstreamApp.groups.some((group) => group.key === customGroup.key)) {
        throw new Error(
          `Custom group key collides with upstream: app=${customApp.id}, group=${customGroup.key}`,
        );
      }
      if (upstreamApp.groups.some((group) => group.name === customGroup.name)) {
        throw new Error(
          `Custom group name collides with upstream: app=${customApp.id}, name=${JSON.stringify(customGroup.name)}`,
        );
      }
      upstreamApp.groups.push(customGroup);
    }

    for (const target of replacements.values()) {
      if (!consumed.has(target.key)) {
        throw new Error(
          `Replacement policy has no custom group with the same key: app=${customApp.id}, group=${target.key}`,
        );
      }
    }
  }

  return result;
};
