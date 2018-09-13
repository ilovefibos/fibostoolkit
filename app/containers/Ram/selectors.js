import { createSelector } from 'reselect';

/**
 * Direct selector to the delegate state domain
 */
const selectRamState = state => state.get('Ram');

/**
 * Other specific selectors
 */

const makeSelectLoading = () => createSelector(selectRamState, substate => substate.get('loading'));
const makeSelectRamRate = () => createSelector(selectRamState, substate => substate.get('ramRate'));

export default selectRamState;
export { selectRamState, makeSelectLoading, makeSelectRamRate };
