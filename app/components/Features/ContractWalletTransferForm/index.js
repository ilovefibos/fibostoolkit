/**
 *
 * SmartTokenTransferForm
 *
 */

import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'recompose';
import { withFormik } from 'formik';
import * as Yup from 'yup';


import Tool from 'components/Tool/Tool';
import ToolSection from 'components/Tool/ToolSection';
import ToolBody from 'components/Tool/ToolBody';

import FormObject from './FormObject';
import Redo from '@material-ui/icons/Redo';

const makeTransaction = values => {
  const transaction = [
    {
      account: 'eosio.token',
      name: 'ctxtransfer',
      data: {
        from: values.owner,
        to: values.name,
        memo: values.memo,
        quantity: `${Number(values.quantity)
          .toFixed(4)
          .toString()} ${values.symbol}@${values.issuer}`,
      },
    },
  ];
  return transaction;
};

const validationSchema = props => {
  return Yup.object().shape({
    owner: Yup.string().required('Sender name is required'),
    name: Yup.string().required('Account name is required'),
    symbol: Yup.string().required('Symbol is required'),
    issuer: Yup.string().required('Sender name is required'),
    memo: Yup.string(),
    quantity: Yup.number()
      .required('Quantity is required')
      .positive('You must send a positive quantity'),
  });
};

const ContractWalletTransferForm = props => {
  return (
    <Tool>
      <ToolSection lg={8}>
        <ToolBody color="warning" icon={Redo} header="Contract Wallet Transfer" subheader="">
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

export default enhance(ContractWalletTransferForm);
