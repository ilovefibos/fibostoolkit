import { makeSelectReader } from 'containers/NetworkClient/selectors';
import { takeLatest, put, select, all } from 'redux-saga/effects';
import { FETCH_RAM_RATE } from './constants';
import { fetchedRamRate } from './actions';
import BigNumber from 'bignumber.js';

function* getRamRate() {
  const reader = yield select(makeSelectReader());

  try {
    const global = yield reader.getTableRows({
      json: 'true',
      code: 'eosio',
      scope: 'eosio',
      table: 'global',
    });

    const ramMarket = yield reader.getTableRows({
      json: 'true',
      code: 'eosio',
      scope: 'eosio',
      table: 'rammarket',
      limit: '10',
    });

    const quoteBalanceAmount = new BigNumber(ramMarket.rows[0].quote.balance.split(' ')[0]);
    const availableRamInKb = new BigNumber(global.rows[0].max_ram_size)
      .minus(new BigNumber(global.rows[0].total_ram_bytes_reserved))
      .div(new BigNumber(1024));

    const ramRate = quoteBalanceAmount.div(availableRamInKb);
    yield put(fetchedRamRate({ ramRate: ramRate.toFixed(5) }));
  } catch (err) {
    console.error('An FOToolkit error occured - see details below:');
    console.error(err);
  }
}

function* watchFetchRam() {
  yield takeLatest(FETCH_RAM_RATE, getRamRate);
}

//
// Combine sagas into root saga
//

export default function* rootSaga() {
  yield all([watchFetchRam()]);
}
