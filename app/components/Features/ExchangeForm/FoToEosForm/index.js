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
          .toString()} FO@eosio`,
        tosym: '4,EOS@eosio',
        memo: 'exchange FO to EOS',
      },
    },
  ];
  return transaction;
};

const validationSchema = Yup.object().shape({
  owner: Yup.string().required('Owner name is required'),
  quantity: Yup.number()
    .required('Quantity is required')
    .positive('You must send a positive quantity'),
});

const FoToEosForm = props => {
  return (
    <ToolBody color="warning" icon={Redo} header="Exchange" subheader=" - FO to EOS">
      <FormObject {...props} />
    </ToolBody>
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
      quantity: '0',
    }),
    validationSchema,
  })
);

export default enhance(FoToEosForm);
