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

import FormObject from './FormObject';

const makeTransaction = values => {
  const transaction = [
    {
      account: 'eosio.token',
      name: 'exshare',
      data: {
        tosym: `4,${values.tosymbol}@${values.toissuer}`,
        memo: values.memo,
        quantity: `${Number(values.fromquantity)
          .toFixed(4)
          .toString()} ${values.fromsymbol}@${values.fromissuer}`,
      },
    },
  ];
  return transaction;
};
const validationSchema = props => {
  return Yup.object().shape({
    fromsymbol: Yup.string().required('From Symbol is required'),
    fromissuer: Yup.string().required('From Issuer name is required'),
    tosymbol: Yup.string().required('To Symbol is required'),
    toissuer: Yup.string().required('To Issuer name is required'),
    memo: Yup.string(),
    fromquantity: Yup.number()
      .required('From Quantity is required')
      .positive('You must send a positive quantity'),
  });
};

const SmartTokenShareForm = props => {
  return (
    <Tool>
      <ToolSection lg={8}>
        <ToolBody color="warning" icon={Payment} header="Share">
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
      const { pushTransaction, accountTokens } = props;
      const transaction = makeTransaction(values, accountTokens);
      setSubmitting(false);
      pushTransaction(transaction, props.history);
    },
    mapPropsToValues: props => ({
      fromsymbol: '',
      fromissuer: '',
      fromquantity: '0',
      tosymbol: '',
      toissuer: '',
      memo: '',
    }),
    validationSchema,
  })
);

export default enhance(SmartTokenShareForm);
