import { defineGkdSubscription } from '@gkd-kit/define';
import upstreamSubscription from '../src/subscription';
import { loadCustomApps } from './load-apps';
import { mergeApps } from './merge-apps';
import metadata from './metadata';
import policy from './overlay-policy';

const customApps = await loadCustomApps(`${import.meta.dirname}/apps`);
const {
  apps: upstreamApps = [],
  categories,
  globalGroups,
} = upstreamSubscription;

export default defineGkdSubscription({
  ...metadata,
  categories,
  globalGroups,
  apps: mergeApps(upstreamApps, customApps, policy),
});
