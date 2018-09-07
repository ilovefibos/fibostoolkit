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

import FormObject from './FormObject';

const makeTransaction = values => {
  const transaction = [
    {
      account: 'eosio.token',
      name: 'excreate',
      data: {
        issuer: values.issuer,
        maximum_supply: `${Number(values.maximum_supply).toFixed(4)} ${values.symbol}`,
        connector_weight: `${Number(values.connector_weight).toFixed(17)} `,
        maximum_exchange: `${Number(values.maximum_exchange).toFixed(4)} ${values.symbol}`,
        reserve_supply: `${Number(values.reserve_supply).toFixed(4)} ${values.symbol}`,
        reserve_connector_balance: `${Number(values.reserve_connector_balance).toFixed(4)} ${values.exchange_symbol}`,
      },
    },
  ];
  return transaction;
};

const validationSchema = props => {
  return Yup.object().shape({
    issuer: Yup.string().required('Issuer account name is required'),
    symbol: Yup.string().required('Symbol is required'),
    exchange_symbol: Yup.string().required('Exchange Symbol is required'),
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
  });
};

const SmartTokenCreateForm = props => {
  return (
    <ToolBody color="warning" icon={Payment} header="SmartTokenCreate">
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
      exchange_symbol: 'FO',
      maximum_supply: '',
      connector_weight: '',
      maximum_exchange: '',
      reserve_supply: '',
      reserve_connector_balance: '',
    }),
    validationSchema,
  })
);

export default enhance(SmartTokenCreateForm);
