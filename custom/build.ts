import { updateDist } from '@gkd-kit/tools';
import subscription from './check';

await updateDist(subscription, {
  outDir: 'custom-dist',
  file: 'gkd.json5',
  versionFile: 'gkd.version.json5',
  changelog: 'CHANGELOG.md',
  readme: 'README.md',
});
