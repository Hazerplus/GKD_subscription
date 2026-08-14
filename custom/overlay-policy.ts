import type { RawApp } from '@gkd-kit/api';

export type GroupTarget = {
  key: number;
  expectedName: string;
};

export type AppOverlayPolicy =
  | {
      mode?: 'append';
      replaceGroups?: readonly GroupTarget[];
    }
  | {
      mode: 'replace';
      expectedAppName: string;
    };

/**
 * Custom app definitions are appended by default.
 * Declare replacements here so upstream changes fail loudly instead of being
 * overwritten silently.
 */
export default {} satisfies Record<RawApp['id'], AppOverlayPolicy>;
