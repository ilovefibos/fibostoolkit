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

import ToolBody from 'components/Tool/ToolBody';

import BigNumber from 'bignumber.js';
import FormObject from './FormObject';

const makeTransaction = values => {
  const transaction = [
    {
      account: 'eosio.token',
      name: 'excreate',
      data: {
        issuer: values.nissuer,
        maximum_supply: `${new BigNumber(values.nmaximum_supply).toFixed(
          Number(values.nprecision),
          1,
        )} ${values.nsymbol}`,
        connector_weight: 0,
        maximum_exchange: `${new BigNumber(0).toFixed(
          Number(values.nprecision),
          1,
        )} ${values.nsymbol}`,
        reserve_supply: `${new BigNumber(0).toFixed(
          Number(values.nprecision),
          1,
        )} ${values.nsymbol}`,
        reserve_connector_balance: `${new BigNumber(0).toFixed(4, 1)} FO`,
        expiration: Number(values.nexpiration),
        buy_fee: 0,
        sell_fee: 0,
        connector_balance_issuer: '',
      },
    },
  ];
  return transaction;
};

const validationSchema = props =>
  Yup.object().shape({
    nissuer: Yup.string().required('Issuer account name is required'),
    nsymbol: Yup.string().required('Symbol is required'),
    nprecision: Yup.number()
      .required('Precision is required')
      .integer('Precision cannot be fractional')
      .max(18)
      .positive('You must send a positive Precision'),
    nmaximum_supply: Yup.number()
      .required('Maximum Supply is required')
      .positive('You must send a positive quantity'),
    nexpiration: Yup.date(),
  });

const NormalTokenCreateForm = props => (
  <ToolBody color="warning" icon={Payment} header="NormalTokenCreate">
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
      nissuer: props.networkIdentity ? props.networkIdentity.name : '',
      nsymbol: '',
      nmaximum_supply: '',
    }),
    validationSchema,
  }),
);

export default enhance(NormalTokenCreateForm);
