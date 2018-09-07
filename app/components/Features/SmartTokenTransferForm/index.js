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

import Payment from '@material-ui/icons/Payment';

import Tool from 'components/Tool/Tool';
import ToolSection from 'components/Tool/ToolSection';
import ToolBody from 'components/Tool/ToolBody';

import FormObject from './FormObject';
import Redo from '@material-ui/icons/Redo';

const accountTokens = account => {
  return account.balances.map(balance => {
    return {
      account: balance.account,
      symbol: balance.balance.split(' ')[1],
      precision: balance.balance.split(' ')[0].split('.')[1].length,
    };
  });
};

const makeTransaction = (values, account) => {
  const token = accountTokens(account).find(
    accountToken => accountToken.symbol === values.symbol && accountToken.account === values.issuer
  );
  const transaction = [
    {
      account: 'eosio.token',
      name: 'extransfer',
      data: {
        from: values.owner,
        to: values.name,
        memo: values.memo,
        quantity: `${Number(values.quantity)
          .toFixed(token.precision)
          .toString()} ${values.symbol}@${values.issuer}`,
      },
    },
  ];
  return transaction;
};

const validationSchema = props => {
  const { account } = props;

  return Yup.object().shape({
    owner: Yup.string().required('Sender name is required'),
    name: Yup.string()
      .notOneOf(['huobideposit', 'binancecleos', 'gateiowallet', 'okbtothemoon'], `Can't transfer to blacklist account`)
      .required('Account name is required'),
    symbol: Yup.string()
      .required('Symbol is required')
      .oneOf(accountTokens(account).map(token => token.symbol)),
    issuer: Yup.string().required('Sender name is required'),
    memo: Yup.string(),
    quantity: Yup.number()
      .required('Quantity is required')
      .positive('You must send a positive quantity'),
  });
};

const SmartTokenTransferForm = props => {
  return (
    <Tool>
      <ToolSection lg={8}>
        <ToolBody color="warning" icon={Redo} header="Transfer" subheader="">
          <FormObject {...props} />
        </ToolBody>
      </ToolSection>
      <ToolSection lg={4}>
        <ToolBody color="info" header="Information">
          <p>Tutorial coming soon</p>
        </ToolBody>
      </ToolSection>
    </Tool>
  );
};

const mapStateToProps = createStructuredSelector({
  account: makeSelectAccount(),
});

const enhance = compose(
  connect(
    mapStateToProps,
    null
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
      name: '',
      symbol: '',
      issuer: '',
      quantity: '0',
      memo: '',
    }),
    validationSchema,
  })
);

export default enhance(SmartTokenTransferForm);
