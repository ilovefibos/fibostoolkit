/**
 *
 * SmartTokenCreateForm
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
import BigNumber from 'bignumber.js';

import FormObject from './FormObject';

const makeTransaction = values => {
  const transaction = [
    {
      account: 'eosio.token',
      name: 'excreate',
      data: {
        issuer: values.issuer,
        maximum_supply: `${new BigNumber(values.maximum_supply).toFixed(
          Number(values.precision),
          1,
        )} ${values.symbol}`,
        connector_weight: `${new BigNumber(values.connector_weight).toFixed(17, 1)}`,
        maximum_exchange: `${new BigNumber(values.maximum_exchange).toFixed(
          Number(values.precision),
          1,
        )} ${values.symbol}`,
        reserve_supply: `${new BigNumber(values.reserve_supply).toFixed(
          Number(values.precision),
          1,
        )} ${values.symbol}`,
        reserve_connector_balance: `${new BigNumber(
          values.reserve_connector_balance,
        ).toFixed(4, 1)} ${values.exchange_symbol}`,
        expiration: Number(values.expiration),
        buy_fee: `${Number(values.buy_fee).toFixed(17)}`,
        sell_fee: `${Number(values.sell_fee).toFixed(17)}`,
        connector_balance_issuer: values.connector_balance_issuer,
      },
    },
  ];
  return transaction;
};

const validationSchema = props =>
  Yup.object().shape({
    issuer: Yup.string().required('Issuer account name is required'),
    symbol: Yup.string().required('Symbol is required'),
    precision: Yup.number()
      .required('Precision is required')
      .integer('Precision cannot be fractional')
      .max(18)
      .positive('You must send a positive Precision'),
    exchange_symbol: Yup.string().required('Exchange Symbol is required'),
    connector_balance_issuer: Yup.string().required(
      'Exchange Symbol Issuer is required',
    ),
    maximum_supply: Yup.number()
      .required('Maximum Supply is required')
      .positive('You must send a positive quantity'),
    connector_weight: Yup.number()
      .required('Connector Weight is required')
      .positive('You must send a positive quantity'),
    reserve_supply: Yup.number()
      .required('Reserve Supply is required')
      .positive('You must send a positive quantity'),
    reserve_connector_balance: Yup.number()
      .required('Reserve Connector Balance is required')
      .positive('You must send a positive quantity'),
    buy_fee: Yup.number()
      .required('Buy fee is required')
      .positive('You must set a positive fee'),
    sell_fee: Yup.number()
      .required('Sell fee is required')
      .positive('You must set a positive fee'),
    expiration: Yup.date(),
  });

const SmartTokenCreateForm = props => (
  <ToolBody color="warning" icon={Payment} header="SmartTokenCreate">
    <FormObject {...props} />
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
      issuer: props.networkIdentity ? props.networkIdentity.name : '',
      symbol: '',
      exchange_symbol: 'FO',
      connector_balance_issuer: 'eosio',
      precision: '',
      maximum_supply: '',
      connector_weight: '',
      maximum_exchange: '',
      reserve_supply: '',
      reserve_connector_balance: '',
      buy_fee: 0,
      sell_fee: 0,
    }),
    validationSchema,
  }),
);

export default enhance(SmartTokenCreateForm);
