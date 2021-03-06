/**
 *
 * Notification
 *
 */

import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import SweetAlert from 'react-bootstrap-sweetalert';
import withStyles from '@material-ui/core/styles/withStyles';
import ContributeTo from 'components/Features/ContributeTo';
import { makeSelectWriterEnabled } from 'containers/NetworkClient/selectors';

import {
  makeSelectNotificationFailure,
  makeSelectNotificationInfo,
  makeSelectNotificationLoading,
  makeSelectNotificationMessage,
  makeSelectNotificationSuccess,
} from './selectors';
import { closeNotification } from './actions';
import reducer from './reducer';
import saga from './saga';

import sweetAlertStyle from './sweetAlertStyle';

// eslint-disable-next-line react/prefer-stateless-function
export class Notification extends React.Component {
  render() {
    function replaceErrors(key, value) {
      if (value instanceof Error) {
        const error = {};

        Object.getOwnPropertyNames(value).forEach(valueKey => {
          error[valueKey] = value[valueKey];
        });

        return error;
      }

      return value;
    }

    const {
      loading,
      failure,
      info,
      success,
      message,
      closeAll,
      writeEnabled,
    } = this.props;
    if (loading) {
      return (
        <SweetAlert
          info
          style={{ display: 'block', marginTop: '-200px' }}
          title="Sending..."
          onConfirm={() => closeAll()}
          onCancel={() => closeAll()}
          confirmBtnText="Hide"
          // onCancel={() => closeAll()}
          confirmBtnCssClass={`${this.props.classes.button} ${
            this.props.classes.info
          }`}
        >
          <h5>
            FO Plugin Wallet should appear shortly to confirm this action.
          </h5>
          <h6>Your transaction will be sent to the network afterwards</h6>
        </SweetAlert>
      );
    }
    if (success) {
      const txid = message && message.TransactionId;

      return (
        <SweetAlert
          success
          style={{ display: 'block', marginTop: '-200px' }}
          title="Success"
          onConfirm={() => closeAll()}
          onCancel={() => closeAll()}
          confirmBtnText="Thanks"
          confirmBtnCssClass={`${this.props.classes.button} ${
            this.props.classes.success
          }`}
        >
          {txid ? (
            <a
              href={`http://explorer.fibos.rocks/transactions/${txid}`}
              target="new"
            >
              <h6>{txid}</h6>
            </a>
          ) : (
            <pre className={this.props.classes.preXYScrollable}>
              {message ? `${JSON.stringify(message, null, 2)}` : ''}
            </pre>
          )}
          <p>Thank you for using FOToolkit.com</p>
          <h6>FOTOOLKIT is open source. Your contribution will be appreciated</h6>
          <h5>
            <ContributeTo />
          </h5>
        </SweetAlert>
      );
    }
    if (info) {
      return (
        <SweetAlert
          info
          style={{ display: 'block', marginTop: '-200px' }}
          title="Info"
          onConfirm={() => closeAll()}
          onCancel={() => closeAll()}
          confirmBtnText="Hide"
          confirmBtnCssClass={`${this.props.classes.button} ${
            this.props.classes.info
          }`}
        >
          <pre className={this.props.classes.preXYScrollable}>
            {message ? `${JSON.stringify(message, null, 2)}` : ''}
          </pre>
        </SweetAlert>
      );
    }
    if (failure && writeEnabled) {
      const error = typeof message === 'string' ? JSON.parse(message) : message;
      if (
        JSON.stringify(error).includes('you have already signed up') ||
        JSON.stringify(error).includes('User already has a balance')
      ) {
        return (
          <SweetAlert
            success
            style={{ display: 'block', marginTop: '-200px' }}
            title="Already Grabbed!"
            onConfirm={() => closeAll()}
            onCancel={() => closeAll()}
            confirmBtnText="Hide"
            // onCancel={() => closeAll()}
            confirmBtnCssClass={`${this.props.classes.button} ${
              this.props.classes.info
            }`}
          >
            <h5>You have already claimed this Airgrab!</h5>
            <h6>You are all set to receive new drops!</h6>
          </SweetAlert>
        );
      }

      return (
        <SweetAlert
          danger
          style={{ display: 'block', marginTop: '-200px' }}
          title="Failure"
          onConfirm={() => closeAll()}
          onCancel={() => closeAll()}
          confirmBtnText="Close"
          confirmBtnCssClass={`${this.props.classes.button} ${
            this.props.classes.danger
          }`}
        >
          <h6>Transaction has failed</h6>
          <pre className={this.props.classes.preXYScrollable}>
            {message
              ? `Details:\n${JSON.stringify(error, replaceErrors, 2)}`
              : ''}
          </pre>
        </SweetAlert>
      );
    }
    if (failure && !writeEnabled) {
      return (
        <SweetAlert
          danger
          style={{ display: 'block', marginTop: '-200px' }}
          title="Failure"
          onConfirm={() => closeAll()}
          onCancel={() => closeAll()}
          confirmBtnText="Close"
          // onCancel={() => closeAll()}
          confirmBtnCssClass={`${this.props.classes.button} ${
            this.props.classes.danger
          }`}
        >
          <h5>You must install and connect FO Plugin Wallet</h5>
          <h5>
            <a href="https://wallet.fo/en-us/fowallet" target="new">
              Get FO Plugin Wallet
            </a>
          </h5>
        </SweetAlert>
      );
    }
    return '';
  }
}

Notification.propTypes = {
  // dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  success: makeSelectNotificationSuccess(),
  failure: makeSelectNotificationFailure(),
  loading: makeSelectNotificationLoading(),
  info: makeSelectNotificationInfo(),
  message: makeSelectNotificationMessage(),
  writeEnabled: makeSelectWriterEnabled(),
});

function mapDispatchToProps(dispatch) {
  return {
    closeAll: () => dispatch(closeNotification()),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);
const styles = withStyles(sweetAlertStyle);
const withReducer = injectReducer({ key: 'notification', reducer });
const withSaga = injectSaga({ key: 'notification', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
  styles,
)(Notification);
