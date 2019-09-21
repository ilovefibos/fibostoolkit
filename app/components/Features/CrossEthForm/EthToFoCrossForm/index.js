/**
 *
 * SmartTokenTransferForm
 *
 */

import React from 'react';
import { connect } from 'react-redux';
import { makeSelectAccount } from 'containers/NetworkClient/selectors';
import { createStructuredSelector } from 'reselect';
import { compose } from 'recompose';
import { withFormik } from 'formik';
import * as Yup from 'yup';

import Tool from 'components/Tool/Tool';
import ToolSection from 'components/Tool/ToolSection';
import ToolBody from 'components/Tool/ToolBody';

import Payment from '@material-ui/icons/Payment';
import FormObject from './FormObject';

const makeTransaction = values => {
  const transaction = [
    {
      account: 'eosio.token',
      name: 'extransfer',
      data: {
        from: values.owner,
        to: 'eth2fibosgtw',
        memo: values.ethAddress,
        quantity: `${Number(values.quantity)
          .toFixed(6)
          .toString()} FOUSDT@eos.io`,
      },
    },
  ];
  return transaction;
};

const EthToFoCrossForm = props => (
  <ToolBody
    color="warning"
    icon={Payment}
    header="Cross Transfer From ETH network To FO network"
    subheader=""
  >
    <a href="http://cross.fo/transfer" target="new">
      Click Here to Cross Transfer From ETH network to FO network.
    </a>
  </ToolBody>
);

const mapStateToProps = createStructuredSelector({
  account: makeSelectAccount(),
});

const enhance = compose(
  connect(
    mapStateToProps,
    null,
  ),
  withFormik({
    handleSubmit: (values, { props, setSubmitting }) => {
      const { pushTransaction, account } = props;
      const transaction = makeTransaction(values, account);
      setSubmitting(false);
      pushTransaction(transaction, props.history);
    },
    mapPropsToValues: props => ({
      owner: props.networkIdentity ? props.networkIdentity.name : '',
      quantity: '0',
      ethAddress: '',
    }),
  }),
);

export default enhance(EthToFoCrossForm);
