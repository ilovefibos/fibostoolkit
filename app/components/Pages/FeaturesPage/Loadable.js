/**
 *
 * Asynchronously loads the component for Airgrab
 *
 */

import loadable from 'loadable-components';

export default loadable(() => import('./index'));
