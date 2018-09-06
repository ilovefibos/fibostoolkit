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
      name: 'transfer',
      data: {
        from: values.owner,
        to: 'fiboscouncil',
        memo: values.memo,
        quantity: `${Number(values.quantity)
          .toFixed(4)
          .toString()} EOS`,
      },
    },
  ];
  return transaction;
};
const validationSchema = props => {
  return Yup.object().shape({
    owner: Yup.string().required('Sender name is required'),
    memo: Yup.string(),
    quantity: Yup.number()
      .required('Quantity is required')
      .positive('You must send a positive quantity'),
  });
};

const WithdrawlForm = props => {
  return (
    <Tool>
      <ToolSection lg={8}>
        <ToolBody color="warning" icon={Payment} header="Withdrawl">
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

const mapStateToProps = createStructuredSelector({});

const enhance = compose(
  connect(
    mapStateToProps,
    null
  ),
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
      memo: '',
    }),
    validationSchema,
  })
);

export default enhance(WithdrawlForm);
