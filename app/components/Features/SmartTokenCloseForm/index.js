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
import { makeSelectAccount } from 'containers/NetworkClient/selectors';

import FormObject from './FormObject';

const makeTransaction = (values, account) => {
  const token = account.userTokens.find(
    userToken =>
      userToken.symbol === values.symbol && userToken.account === values.issuer,
  );
  const transaction = [
    {
      account: 'eosio.token',
      name: 'exclose',
      data: {
        owner: values.owner,
        symbol: `${Number('0')
          .toFixed(token.precision)
          .toString()} ${values.symbol}@${values.issuer}`,
      },
    },
  ];
  return transaction;
};
const validationSchema = props =>
  Yup.object().shape({
    owner: Yup.string().required('Owner account name is required'),
    symbol: Yup.string().required('Symbol is required'),
    issuer: Yup.string().required('Issuer name is required'),
  });

const SmartTokenCloseForm = props => (
  <Tool>
    <ToolSection lg={8}>
      <ToolBody color="warning" icon={Payment} header="Close">
        <FormObject {...props} />
      </ToolBody>
    </ToolSection>
    <ToolSection lg={4}>
      <ToolBody color="info" header="Tutorial">
        <a
          href="https://dev.fo/zh-cn/api/token/index.html#exclose"
          target="new"
        >
          Dev.fo Documentation
        </a>
      </ToolBody>
    </ToolSection>
  </Tool>
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
      owner: props.networkIdentity ? props.networkIdentity.name : '',
      symbol: '',
      issuer: '',
    }),
    validationSchema,
  }),
);

export default enhance(SmartTokenCloseForm);
