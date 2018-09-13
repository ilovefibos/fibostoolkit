/*
 *
 * HorusPay reducer
 *
 */

import { fromJS } from 'immutable';
import { FETCH_EXCHANGE_RATE, FETCHED_EXCHANGE_RATE } from './constants';

const initialState = fromJS({
  loading: false,
  rate: {},
});

function ExchangeReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_EXCHANGE_RATE:
      return state.set('loading', true);
    case FETCHED_EXCHANGE_RATE:
      return state.set('rate', action.rate).set('loading', false);
    default:
      return state;
  }
}

export default ExchangeReducer;
