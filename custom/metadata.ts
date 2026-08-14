import type { RawSubscription } from '@gkd-kit/api';

/**
 * Stable identity of Hazerplus's merged subscription. No public GitHub code
 * match existed when this id was selected; keep it unchanged after release.
 */
export default {
  id: 142848377,
  name: 'Hazerplus 的 GKD 订阅',
  version: 1,
  author: 'Hazerplus',
  updateUrl:
    'https://raw.githubusercontent.com/Hazerplus/GKD_subscription/main/custom-dist/gkd.json5',
  checkUpdateUrl: './gkd.version.json5',
  supportUri: 'https://github.com/Hazerplus/GKD_subscription/issues/new',
} satisfies Pick<
  RawSubscription,
  | 'id'
  | 'name'
  | 'version'
  | 'author'
  | 'updateUrl'
  | 'checkUpdateUrl'
  | 'supportUri'
>;
