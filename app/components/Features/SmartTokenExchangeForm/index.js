/**
 *
 * DelegateForm
 *
 */

import React from 'react';
import { compose } from 'recompose';
import { withFormik } from 'formik';
import * as Yup from 'yup';

import Redo from '@material-ui/icons/Redo';
import ToolBody from 'components/Tool/ToolBody';
import Tool from 'components/Tool/Tool';
import ToolSection from 'components/Tool/ToolSection';

import FormObject from './FormObject';

const makeTransaction = values => {
  const transaction = [
    {
      account: 'eosio.token',
      name: 'exchange',
      data: {
        owner: values.owner,
        quantity: `${Number(values.quantity)
          .toFixed(4)
          .toString()} ${values.fromSymbol}@${values.fromSymbolIssuer}`,
        tosym: `4,${values.toSymbol}@${values.toSymbolIssuer}`,
        memo: `exchange ${values.fromSymbol} to ${values.toSymbol}`,
      },
    },
  ];
  return transaction;
};

const validationSchema = Yup.object().shape({
  owner: Yup.string().required('Owner name is required'),
  fromSymbol: Yup.string().required('From token symbol is required'),
  fromSymbolIssuer: Yup.string().required('From token issuer is required'),
  toSymbol: Yup.string().required('To token symbol is required'),
  toSymbolIssuer: Yup.string().required('To token issuer is required'),
  quantity: Yup.number()
    .required('Quantity is required')
    .positive('You must send a positive quantity'),
});

const SmartTokenExchangeForm = props => {
  return (
    <Tool>
      <ToolSection lg={8}>
        <ToolBody color="warning" icon={Redo} header="Exchange" subheader="">
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

const enhance = compose(
  withFormik({
    handleSubmit: (values, { props, setSubmitting }) => {
      const { pushTransaction } = props;
      const transaction = makeTransaction(values);
      setSubmitting(false);
      pushTransaction(transaction, props.history);
    },
    mapPropsToValues: props => ({
      owner: props.networkIdentity ? props.networkIdentity.name : '',
      fromSymbol: 'FO',
      fromSymbolIssuer: 'eosio',
      toSymbol: '',
      toSymbolIssuer: '',
      quantity: '0',
    }),
    validationSchema,
  })
);

export default enhance(SmartTokenExchangeForm);
