/**
 *
 * SmartTokenTransferForm
 *
 */

import React from 'react';
import { connect } from 'react-redux';
import { makeSelectAccount } from 'containers/NetworkClient/selectors';
import { createStructuredSelector } from 'reselect';
import { compose } from 'recompose';
import { withFormik } from 'formik';
import * as Yup from 'yup';
import Hash from 'eth-lib/lib/hash';

import Tool from 'components/Tool/Tool';
import ToolSection from 'components/Tool/ToolSection';
import ToolBody from 'components/Tool/ToolBody';

import Payment from '@material-ui/icons/Payment';
import web3 from 'web3';
import FormObject from './FormObject';
const makeTransaction = values => {
  const transaction = [
    {
      account: 'eosio.token',
      name: 'extransfer',
      data: {
        from: values.owner,
        to: 'eosio.cross',
        memo: `${values.ethAddress.toLowerCase()}`,
        quantity: `${Number(values.quantity)
          .toFixed(6)
          .toString()} FOUSDT@eosio`,
        tosym: '6,FOUSDT@eosio',
      },
    },
  ];
  return transaction;
};

const validationSchema = props =>
  Yup.object().shape({
    owner: Yup.string().required('Sender name is required'),
    ethAddress: Yup.string()
      .test('isEthAddress', 'ETH address not valid', value =>
        isAddress(`${value}`),
      )
      .required(`ETH Address is required`),
    quantity: Yup.number()
      .required('Quantity is required')
      .positive('You must send a positive quantity'),
  });

// from web3, to be simplify
const isAddress = (address, chainId = null) => {
  if (!/^(0x)?[0-9a-f]{40}$/i.test(address)) {
    return false;
  }
  if (
    /^(0x|0X)?[0-9a-f]{40}$/.test(address) ||
    /^(0x|0X)?[0-9A-F]{40}$/.test(address)
  ) {
    return true;
  }
  return checkAddressChecksum(address, chainId);
};
const stripHexPrefix = string =>
  string.slice(0, 2) === '0x' ? string.slice(2) : string;
const checkAddressChecksum = address => {
  const stripAddress = stripHexPrefix(address).toLowerCase();
  const prefix = '';
  const keccakHash = Hash.keccak256(prefix + stripAddress)
    .toString('hex')
    .replace(/^0x/i, '');
  for (let i = 0; i < stripAddress.length; i++) {
    const output =
      parseInt(keccakHash[i], 16) >= 8
        ? stripAddress[i].toUpperCase()
        : stripAddress[i];
    if (stripHexPrefix(address)[i] !== output) {
      return false;
    }
  }
  return true;
};

const FoToEthCrossForm = props => (
  <ToolBody
    color="warning"
    icon={Payment}
    header="FO Cross Transfer to ETH"
    subheader=""
  >
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
      owner: props.networkIdentity ? props.networkIdentity.name : '',
      quantity: '0',
      ethAddress: '',
    }),
    validationSchema,
  }),
);

export default enhance(FoToEthCrossForm);
