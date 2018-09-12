import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import {
  makeSelectReaderLoading,
  makeSelectWriterLoading,
  makeSelectAccountLoading,
  makeSelectReaderEnabled,
  makeSelectWriterEnabled,
  makeSelectAccountEnabled,
} from 'containers/NetworkClient/selectors';
import CheckCircle from '@material-ui/icons/CheckCircle';
import HighlightOff from '@material-ui/icons/HighlightOff';
import CircularProgress from '@material-ui/core/CircularProgress';
import { compose } from 'redux';
import { injectIntl } from 'react-intl';
import messages from "./messages";

const status = (enabled, loading) => {
  if (enabled) return <CheckCircle />;
  if (loading) return <CircularProgress size={20} color="inherit" />;
  return <HighlightOff />;
};

const NetworkStatus = props => {
  return (
    <div>
      <span title={props.intl.formatMessage(messages.readMessage)}>
        {props.intl.formatMessage(messages.read)}: {status(props.readerEnabled, props.readerLoading)}{' '}
      </span>
      <span title={props.intl.formatMessage(messages.writerMessage)}>
        {props.intl.formatMessage(messages.write)}: {status(props.writerEnabled, props.writerLoading)}{' '}
      </span>
      <span title={props.intl.formatMessage(messages.accountMessage)}>
        {props.intl.formatMessage(messages.account)}: {status(props.accountEnabled, props.accountLoading)}
      </span>
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  readerLoading: makeSelectReaderLoading(),
  writerLoading: makeSelectWriterLoading(),
  accountLoading: makeSelectAccountLoading(),
  readerEnabled: makeSelectReaderEnabled(),
  writerEnabled: makeSelectWriterEnabled(),
  accountEnabled: makeSelectAccountEnabled(),
});
export default compose(
  connect(
    mapStateToProps,
    null
  ),
  injectIntl
)(NetworkStatus);
