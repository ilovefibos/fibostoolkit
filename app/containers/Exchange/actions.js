/*
 *
 * HorusPay actions
 *
 */

import { FETCH_EXCHANGE_RATE, FETCHED_EXCHANGE_RATE } from './constants';

export function fetchExchangeRate() {
  return {
    type: FETCH_EXCHANGE_RATE,
  };
}

export function fetchedExchangedRate(rate) {
  return {
    type: FETCHED_EXCHANGE_RATE,
    rate,
  };
}
