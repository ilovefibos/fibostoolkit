import { createSelector } from 'reselect';

/**
 * Direct selector to the delegate state domain
 */
const selectExchangeState = state => state.get('Exchange');

/**
 * Other specific selectors
 */

const makeSelectLoading = () => createSelector(selectExchangeState, substate => substate.get('loading'));
const makeSelectRate = () => createSelector(selectExchangeState, substate => substate.get('rate'));

export default selectExchangeState;
export { selectExchangeState, makeSelectLoading, makeSelectRate };
