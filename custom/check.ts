import { checkApiVersion, checkSubscription } from '@gkd-kit/tools';
import subscription from './subscription';

await checkApiVersion();
checkSubscription(subscription);

export default subscription;
