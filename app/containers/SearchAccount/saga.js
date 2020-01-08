import { makeSelectReader } from 'containers/NetworkClient/selectors';
import { takeLatest, call, put, select, all, fork, join } from 'redux-saga/effects';
import { makeSelectSearchName, makeSelectSearchPubkey } from './selectors';
import { LOOKUP_ACCOUNT, LOOKUP_PUBKEY } from './constants';
import { lookupLoading, lookupLoaded } from './actions';
import { makeSelectActiveNetwork, makeSelectNetworks } from '../NetworkClient/selectors'
import { updateNetworks } from '../NetworkClient/actions'
import { getPrecisionFromMaxSupply } from '../../utils/currencyUtil';

function* getCurrency(token, name) {
  const networkReader = yield select(makeSelectReader());
  try {
    const currency = yield networkReader.getCurrencyBalance(token, name);
    const currencies = currency.map(c => {
      return {
        account: token,
        balance: c,
      };
    });
    return currencies;
  } catch (err) {
    console.error('An FOToolkit error occured - see details below:');
    console.error(err);
    return [];
  }
}

const balanceTable = name => {
  return {
    json: true,
    scope: ` ${name}`,
    code: 'eosio.token',
    table: 'accounts',
    limit: 100,
  };
};

function* getContractWalletBalance(reader, name) {
  try {
    const currencyResult = yield reader.getTableRows({
      json: true,
      code: 'eosio.token',
      scope: ` ${name}`,
      table: 'ctxaccounts',
    });
    const currencies = currencyResult.rows.map(c => {
      return {
        account: c.balance.contract,
        balance: c.balance.quantity,
      };
    });
    return currencies;
  } catch (c) {
    console.error('An FOToolkit error occured - see details below:');
    console.error(c);
    return [];
  }
}
function* getAcountTokenBalanceFromTable(reader, name) {
  const currencyResult = yield reader.getTableRows(balanceTable(name));
  const currencies = currencyResult.rows.map(c => {
    return {
      account: c.balance.contract,
      balance: c.balance.quantity,
    };
  });
  return currencies;
}

function* getTokenInfoByIssuerFromTable(reader, tokenAccount) {
  const currencyResult = yield reader.getTableRows({
    json: true,
    scope: ` ${tokenAccount}`,
    code: 'eosio.token',
    table: 'stats',
    limit: 100
  });
  const currencies = currencyResult.rows.map(c => {
    return {
      account: tokenAccount,
      symbol: c.max_supply.split(' ')[1],
      precision: getPrecisionFromMaxSupply(c.max_supply),
      ...c
    };
  });
  return currencies;
}

function* getAccountDetail(name) {
  try {
    const networkReader = yield select(makeSelectReader());
    // const eosTokens = yield select(selectTokens());
    const account = yield networkReader.getAccount(name);
    // const tokens = yield all(
    //   eosTokens.map(token => {
    //     return fork(getCurrency, token.account, name);
    //   })
    // );
    // const currencies = yield join(...tokens);
    // const balances = currencies.reduce((a, b) => a.concat(b), []);
    const balances = yield getAcountTokenBalanceFromTable(networkReader, name);
    const contractWalletBalances = yield getContractWalletBalance(networkReader, name);
    const userTokens = yield getTokenInfoByIssuerFromTable(networkReader, name);

    return {
      ...account,
      balances,
      contractWalletBalances,
      userTokens
    };
  } catch (err) {
    console.error('An FOToolkit error occured - see details below:');
    console.error(err);
    return {};
  }
}

//
// Get the EOS all accounts by public key
//
function* performSearchPubkey() {
  const networkReader = yield select(makeSelectReader());
  const publicKey = yield select(makeSelectSearchPubkey());
  yield put(lookupLoading());
  try {
    const res = yield networkReader.getKeyAccounts(publicKey);
    const details = yield all(
      res.account_names.map(accountName => {
        return fork(getAccountDetail, accountName);
      })
    );
    const accounts = yield join(...details);
    yield put(lookupLoaded(accounts));
  } catch (err) {
    console.error('An FOToolkit error occured - see details below:');
    console.error(err);
    yield put(lookupLoaded([]));
  }
}

function* watchSeachPubkey() {
  yield takeLatest(LOOKUP_PUBKEY, performSearchPubkey);
}

//
// Get the EOS single account
//
function* performSearchAccount() {
  const accountName = yield select(makeSelectSearchName());
  yield put(lookupLoading());
  try {
    const account = yield call(getAccountDetail, accountName);
    if (account.account_name) {
      yield put(lookupLoaded([account]));
    } else {
      yield put(lookupLoaded([]));
    }
  } catch (err) {
    console.error('An FOToolkit error occured - see details below:');
    console.error(err);
    yield put(lookupLoaded([]));
  }
}

function* watchSeachAccount() {
  yield takeLatest(LOOKUP_ACCOUNT, performSearchAccount);
}

//
// Combine sagas into root saga
//

export default function* rootSaga() {
  yield all([watchSeachAccount(), watchSeachPubkey()]);
}
