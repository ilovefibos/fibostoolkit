/*
 *
 * HorusPay reducer
 *
 */

import { fromJS } from 'immutable';
import { FETCH_RAM_RATE, FETCHED_RAM_RATE } from './constants';

const initialState = fromJS({
  loading: false,
  ramRate: {},
});

function RamReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_RAM_RATE:
      return state.set('loading', true);
    case FETCHED_RAM_RATE:
      return state.set('ramRate', action.ramRate).set('loading', false);
    default:
      return state;
  }
}

export default RamReducer;
