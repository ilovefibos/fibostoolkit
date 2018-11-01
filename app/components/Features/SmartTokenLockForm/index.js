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
      name: 'exlocktrans',
      data: {
        from: values.from,
        to: values.to,
        expiration: Number(values.expiration),
        expiration_to: Number(values.expiration_to),
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
    from: Yup.string()
      .notOneOf(['huobideposit', 'binancecleos', 'gateiowallet', 'okbtothemoon'], `Can't transfer to blacklist account`)
      .required('Account name is required'),
    to: Yup.string().required('Account name is required'),
    symbol: Yup.string().required('Symbol is required'),
    issuer: Yup.string().required('Issuer name is required'),
    memo: Yup.string(),
    expiration: Yup.date(),
    expiration_to: Yup.date(),
    quantity: Yup.number()
      .required('Quantity is required')
      .positive('You must send a positive quantity'),
  });
};

const SmartTokenLockForm = props => {
  return (
    <Tool>
      <ToolSection lg={8}>
        <ToolBody color="warning" icon={Payment} header="Lock Transfer">
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
      from: props.networkIdentity ? props.networkIdentity.name : '',
      to: '',
      symbol: '',
      issuer: '',
      quantity: '0',
      expiration: '',
      memo: '',
    }),
    validationSchema,
  })
);

export default enhance(SmartTokenLockForm);
