import { makeSelectReader } from 'containers/NetworkClient/selectors';
import { takeLatest, put, select, all } from 'redux-saga/effects';
import { FETCH_EXCHANGE_RATE } from './constants';
import { fetchedExchangedRate } from './actions';
import BigNumber from 'bignumber.js';

function* getExchangeRate() {
  const reader = yield select(makeSelectReader());

  try {
    const currencyResult = yield reader.getTableRows({
      json: true,
      scope: ` eosio`,
      code: 'eosio.token',
      table: 'stats',
    });
    const currencies = currencyResult.rows.map(c => {
      return {
        ...c,
        account: 'eosio',
        symbol: c.max_supply.split(' ')[1],
        precision: c.max_supply.split(' ')[0].split('.')[1].length,
        supply: new BigNumber(c.supply.split(' ')[0]),
        reserve_supply: new BigNumber(c.reserve_supply.split(' ')[0]),
        connector_weight: new BigNumber(c.connector_weight),
        connector_balance: new BigNumber(c.connector_balance.split(' ')[0]),
        reserve_connector_balance: new BigNumber(c.reserve_connector_balance.split(' ')[0]),
      };
    });
    const FO = currencies.find(item => item.symbol === 'FO');
    const rate = FO.connector_weight
      .times(FO.reserve_supply.plus(FO.supply))
      .div(FO.connector_balance.plus(FO.reserve_connector_balance))
      .toFixed(FO.precision, 8);
    yield put(fetchedExchangedRate({ rate }));
  } catch (err) {
    console.error('An FOToolkit error occured - see details below:');
    console.error(err);
  }
}

function* watchFetchStake() {
  yield takeLatest(FETCH_EXCHANGE_RATE, getExchangeRate);
}

//
// Combine sagas into root saga
//

export default function* rootSaga() {
  yield all([watchFetchStake()]);
}
