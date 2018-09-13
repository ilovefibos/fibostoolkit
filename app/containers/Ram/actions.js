/*
 *
 * HorusPay actions
 *
 */

import { FETCH_RAM_RATE, FETCHED_RAM_RATE } from './constants';

export function fetchRamRate() {
  return {
    type: FETCH_RAM_RATE,
  };
}

export function fetchedRamRate(ramRate) {
  return {
    type: FETCHED_RAM_RATE,
    ramRate,
  };
}
