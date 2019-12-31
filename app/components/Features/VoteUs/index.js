/**
 *
 * Vote for us
 *
 */

import React from 'react';

import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import {
  makeSelectIdentity,
  makeSelectAccount,
} from 'containers/NetworkClient/selectors';
import { pushTransaction as sendTransaction } from 'containers/NetworkClient/actions';
import { compose } from 'redux';
import { injectIntl } from 'react-intl';
import messages from './messages';

const makeTransaction = (networkIdentity, accountData, intl) => {
  if (!accountData) {
    return { error: intl.formatMessage(messages.noPluginWallet) };
  }
  const producers = accountData.voter_info
    ? accountData.voter_info.producers
    : [];
  if (producers.includes('ilovefibosbp')) {
    return { success: intl.formatMessage(messages.alreadVoteUs) };
  }
  if (producers.length > 29) {
    producers.pop();
  }
  producers.push('ilovefibosbp');
  producers.sort();
  const transaction = [
    {
      account: 'eosio',
      name: 'voteproducer',
      data: {
        voter: networkIdentity ? networkIdentity.name : '',
        proxy: '',
        producers,
      },
    },
  ];
  return transaction;
};

const VoteUs = props => {
  const {
    pushTransaction,
    networkIdentity,
    networkAccount,
    className,
    intl,
  } = props;
  const handleSubmit = () => {
    const transaction = makeTransaction(networkIdentity, networkAccount, intl);
    pushTransaction(transaction, props.history);
  };
  return (
    <a onClick={handleSubmit} className={className}>
      {props.intl.formatMessage(messages.voteForUs)}
    </a>
  );
};

const mapStateToProps = createStructuredSelector({
  networkIdentity: makeSelectIdentity(),
  networkAccount: makeSelectAccount(),
});

function mapDispatchToProps(dispatch) {
  return {
    pushTransaction: (transaction, history) =>
      dispatch(sendTransaction(transaction, history)),
  };
}

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  ),
  injectIntl,
)(VoteUs);
