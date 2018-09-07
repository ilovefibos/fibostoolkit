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

import FormObject from './FormObject';

const makeTransaction = values => {
  const transaction = [
    {
      account: 'eosio.token',
      name: 'excreate',
      data: {
        issuer: values.issuer,
        maximum_supply: `${Number(values.maximum_supply).toFixed(4)} ${values.symbol}`,
        connector_weight: 0,
        maximum_exchange: `${Number(0).toFixed(4)} ${values.symbol}`,
        reserve_supply: `${Number(0).toFixed(4)} ${values.symbol}`,
        reserve_connector_balance: `${Number(0).toFixed(4)} FO`,
      },
    },
  ];
  return transaction;
};

const validationSchema = props => {
  return Yup.object().shape({
    issuer: Yup.string().required('Issuer account name is required'),
    symbol: Yup.string().required('Symbol is required'),
    maximum_supply: Yup.number()
      .required('Maximum Supply is required')
      .positive('You must send a positive quantity'),
  });
};

const NormalTokenCreateForm = props => {
  return (
    <ToolBody color="warning" icon={Payment} header="NormalTokenCreate">
      <FormObject {...props} />
    </ToolBody>
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
      issuer: props.networkIdentity ? props.networkIdentity.name : '',
      symbol: '',
      maximum_supply: '',
    }),
    validationSchema,
  })
);

export default enhance(NormalTokenCreateForm);
