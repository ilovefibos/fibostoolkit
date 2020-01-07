/**
 *
 * TransferForm
 *
 */

import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'recompose';
import { withFormik } from 'formik';
import * as Yup from 'yup';

import Payment from '@material-ui/icons/Payment';

import Tool from 'components/Tool/Tool';
import ToolSection from 'components/Tool/ToolSection';
import ToolBody from 'components/Tool/ToolBody';
import { makeSelectAccount } from 'containers/NetworkClient/selectors';

import FormObject from './FormObject';

const accountTokens = account =>
  account.balances.map(balance => ({
    account: balance.account,
    symbol: balance.balance.split(' ')[1],
    precision: balance.balance.split(' ')[0].split('.')[1].length,
  }));

const makeTransaction = (values, account) => {
  const token = accountTokens(account).find(
    accountToken =>
      accountToken.symbol === values.symbol &&
      accountToken.account === values.issuer,
  );
  const transaction = [
    {
      account: 'eosio.token',
      name: 'exretire',
      data: {
        from: values.name,
        memo: values.memo,
        quantity: `${Number(values.quantity)
          .toFixed(token.precision)
          .toString()} ${values.symbol}@${values.issuer}`,
      },
    },
  ];
  return transaction;
};
const validationSchema = props =>
  Yup.object().shape({
    name: Yup.string().required('Account name is required'),
    symbol: Yup.string().required('Symbol is required'),
    issuer: Yup.string().required('Issuer name is required'),
    memo: Yup.string(),
    quantity: Yup.number()
      .required('Quantity is required')
      .positive('You must send a positive quantity'),
  });

const SmartTokenRetireForm = props => (
  <Tool>
    <ToolSection lg={8}>
      <ToolBody color="warning" icon={Payment} header="Retire">
        <FormObject {...props} />
      </ToolBody>
    </ToolSection>
    <ToolSection lg={4}>
      <ToolBody color="info" header="Tutorial">
        <p>Tutorial coming soon</p>
      </ToolBody>
    </ToolSection>
  </Tool>
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
      name: props.networkIdentity ? props.networkIdentity.name : '',
      symbol: '',
      issuer: '',
      quantity: '0',
      memo: '',
    }),
    validationSchema,
  }),
);

export default enhance(SmartTokenRetireForm);
