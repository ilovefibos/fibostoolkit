// import Ping from 'ping.js';
import Ping from 'utils/ping';
import { orderBy } from 'lodash';
import { put, all, join, fork, select, call, spawn } from 'redux-saga/effects';
import { networksUrl, fibosSmartTokensUrl } from 'remoteConfig';

import { loadedNetworks, updateNetworks, loadedAccount, setNetwork } from '../actions';
import {
  makeSelectIdentity,
  makeSelectReader,
  makeSelectNetworks,
  makeSelectActiveNetwork,
} from '../selectors';

/*
*
* NETWORKS
* Get available networks
*
*/

// fetch networks and select defaultNetwork
export function* fetchNetworks() {
  try {
    // fetch the remote network list
    const data = yield fetch(networksUrl);
    const rawNetworks = yield data.json();

    const networks = rawNetworks.map(network => {
      const { endpoints, ...networkDetails } = network;
      const endpointDetails = endpoints.map(endpoint => {
        return {
          ...endpoint,
          failures: 0,
          ping: -1,
        };
      });
      return {
        ...networkDetails,
        endpoints: endpointDetails,
      };
    });

    // get default
    // const network = networks.find(n => n.network === 'eos' && n.type === 'mainnet');
    // const endpoint = network.endpoints.find(e => e.name === 'Greymass');
    const network = networks.find(n => n.network === 'fibos' && n.type === 'mainnet');
    const endpoint = network.endpoints.find(e => e.name === 'Fibos Rocks');

    // build activeNetwork
    const activeNetwork = {
      network,
      endpoint,
    };

    yield put(loadedNetworks(networks, activeNetwork));
  } catch (err) {
    console.error('An FOToolkit error occured - see details below:');
    console.error(err);
  }
}

function* makeEndpointsLatency(endpoint) {
  const { ping, ...endpointDetails } = endpoint;

  try {
    return {
      ...endpointDetails,
      ping: yield call(Ping, `${endpoint.protocol}://${endpoint.url}:${endpoint.port}/v1/chain/get_info`),
    };
  } catch (c) {
    return {
      ...endpointDetails,
      ping: 5000,
    };
  }
}

export function* fetchLatency() {
  try {
    // fetch the remote network list
    const networks = yield select(makeSelectNetworks());
    const active = yield select(makeSelectActiveNetwork());

    const activeIndex = networks.findIndex(network => {
      return network.chainId === active.network.chainId;
    });

    let endpoints = networks[activeIndex].endpoints;

    const latencies = yield all(
      endpoints.map(endpoint => {
        return fork(makeEndpointsLatency, endpoint);
      })
    );

    endpoints = yield join(...latencies);
    networks[activeIndex].endpoints = endpoints;
    yield put(updateNetworks(networks));

    const sorted = orderBy(endpoints, ['failures', 'ping'], 'asc');
    const best = sorted[0];

    if (active.endpoint.name !== best.name) {
      const activeNetwork = {
        network: networks[activeIndex],
        endpoint: best,
      };

      yield put(setNetwork(activeNetwork, false));
    }
  } catch (err) {
    console.error('An FOToolkit error occured - see details below:');
    console.error(err);
  }
}

/*
*
* TOKENS
* Get tokens and stats
*
*/

function* fetchTokenInfo(reader, account, symbol) {
  try {
    if (symbol === 'OCT') throw { message: 'OCT has no STATS table - please fix!' };
    const stats = yield reader.getCurrencyStats(account, symbol);
    const precision = stats[symbol].max_supply.split(' ')[0].split('.')[1].length;
    return {
      account,
      symbol,
      precision,
    };
  } catch (c) {
    return {
      account,
      symbol,
      precision: 4,
    };
  }
}

function* getTokenInfoByIssuerFromTable(reader, tokenAccount) {
  const currencyResult = yield reader.getTableRows({
    json: true,
    scope: ` ${tokenAccount}`,
    code: 'eosio.token',
    table: 'stats',
  });
  const currencies = currencyResult.rows.map(c => {
    return {
      account: tokenAccount,
      symbol: c.max_supply.split(' ')[1],
      precision: c.max_supply.split(' ')[0].split('.')[1].length,
    };
  });
  return currencies;
}

export function* fetchTokens(reader) {
  try {
    const data = yield fetch(fibosSmartTokensUrl);
    const list = yield data.json();
    const accountList = list.map(token => token.account).filter((elem, pos, arr) => arr.indexOf(elem) === pos);
    const tokenList = list.map(token => token.symbol).filter((elem, pos, arr) => arr.indexOf(elem) === pos);

    const info = yield all(
      accountList.map(account => {
        return fork(getTokenInfoByIssuerFromTable, reader, account);
      })
    );
    const tokens = yield join(...info);
    const result = tokens.filter(elem => tokenList.indexOf(elem) === -1);
    // const tokens = yield getTokenInfoByAccountFromTable(reader, account);
    return result;
  } catch (err) {
    console.error('An FOToolkit error occured - see details below:');
    console.error(err);
    return null;
  }
}

/*
*
* IDENTITY
* Get signer identity
*
*/

export function* fetchIdentity(signer, activeNetwork) {
  try {
    const currentIdentity = yield select(makeSelectIdentity());
    // build a network to suggest
    const networkConfig = {
      protocol: activeNetwork.endpoint.protocol,
      blockchain: activeNetwork.network.network,
      host: activeNetwork.endpoint.url,
      port: activeNetwork.endpoint.port,
      chainId: activeNetwork.network.chainId,
    };

    // suggest the network to the user
    // yield signer.suggestNetwork(networkConfig);

    // get identities specific to the activeNetwork
    const id = yield signer.getIdentity({
      accounts: [
        {
          chainId: activeNetwork.network.chainId,
          blockchain: activeNetwork.network.network,
        },
      ],
    });
    const match = id && id.accounts.find(x => x.blockchain === activeNetwork.network.network);

    if (match) {
      return match;
    }
    return null;
  } catch (err) {
    console.error('An FOToolkit error occured - see details below:');
    console.error(err);
    return null;
  }
}

/*
*
* ACCOUNT
* Load account(s) that has been selected as identity
*
*/

function* getCurrency(reader, token, name) {
  try {
    const currency = yield reader.getCurrencyBalance(token, name);
    const currencies = currency.map(c => {
      return {
        account: token,
        balance: c,
      };
    });
    return currencies;
  } catch (c) {
    const networks = yield select(makeSelectNetworks());
    const active = yield select(makeSelectActiveNetwork());

    const activeIndex = networks.findIndex(network => {
      return network.chainId === active.network.chainId;
    });

    const endpointIndex = networks[activeIndex].endpoints.findIndex(endpoint => {
      return endpoint.name === active.endpoint.name;
    });

    networks[activeIndex].endpoints[endpointIndex].failures += 1;

    yield put(updateNetworks(networks));
    return [];
  }
}
const balanceTable = name => {
  return {
    json: true,
    scope: ` ${name}`,
    code: 'eosio.token',
    table: 'accounts',
  };
};

function* getAccountTokenBalanceFromTable(reader, name) {
  try {
    const currencyResult = yield reader.getTableRows(balanceTable(name));
    const currencies = currencyResult.rows.map(c => {
      return {
        account: c.balance.contract,
        balance: c.balance.quantity,
      };
    });
    return currencies;
  } catch (c) {
    const networks = yield select(makeSelectNetworks());
    const active = yield select(makeSelectActiveNetwork());

    const activeIndex = networks.findIndex(network => {
      return network.chainId === active.network.chainId;
    });

    const endpointIndex = networks[activeIndex].endpoints.findIndex(endpoint => {
      return endpoint.name === active.endpoint.name;
    });

    networks[activeIndex].endpoints[endpointIndex].failures += 1;

    yield put(updateNetworks(networks));
    return [];
  }
}

function* getAccountDetail(reader, name) {
  try {
    const account = yield reader.getAccount(name);
    // const tokens = yield select(makeSelectTokens());
    // const tokenData = yield all(
    //   tokens.map(token => {
    //     return fork(getCurrency, reader, token.account, name);
    //   })
    // );
    //
    // const currencies = yield join(...tokenData);
    // const balances = currencies.reduce((a, b) => a.concat(b), []);
    const balances = yield getAccountTokenBalanceFromTable(reader, name);
    // disable endpoint auto switch
    // yield spawn(fetchLatency);
    return {
      ...account,
      balances,
    };
  } catch (c) {
    console.log('getAccount error');
    console.log(c);
    return null;
  }
}

export function* fetchAccount() {
  try {
    const reader = yield select(makeSelectReader());
    const identity = yield select(makeSelectIdentity());
    if (identity && identity.name) {
      const account = yield call(getAccountDetail, reader, identity.name);
      yield put(loadedAccount(account));
    } else {
      yield put(loadedAccount(null));
    }
  } catch (err) {
    console.error('An FOToolkit error occured - see details below:');
    console.error(err);
  }
}
