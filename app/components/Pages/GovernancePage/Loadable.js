/**
 * Asynchronously loads the component
 */
import loadable from 'loadable-components';

export default loadable(() => import('./index'));
