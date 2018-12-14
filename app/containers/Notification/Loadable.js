/**
 *
 * Asynchronously loads the component for Notification
 *
 */

import loadable from 'loadable-components';

export default loadable(() => import('./index'));
