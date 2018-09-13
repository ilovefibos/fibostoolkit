/**
 *
 *
 */

import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import { makeSelectReaderEnabled, makeSelectWriterEnabled } from 'containers/NetworkClient/selectors';
import { makeSelectLoading, makeSelectRate } from './selectors';
import { fetchExchangeRate } from './actions';
import reducer from './reducer';
import saga from './saga';
import ExchangeForm from '../../components/Features/ExchangeForm';

export class Exchange extends React.Component {
  // eslint-disable-line react/prefer-stateless-function

  componentDidMount() {
    this.interval = setInterval(() => this.props.fetchExchangeRate(), 5000);
  }

  componentWillUpdate(nextProps) {
    if (this.props.readerEnabled !== nextProps.readerEnabled) {
      // start loading the reader asap
      this.props.fetchExchangeRate();
    }
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  render() {
    return <ExchangeForm {...this.props} />;
  }
}

const mapStateToProps = createStructuredSelector({
  readerEnabled: makeSelectReaderEnabled(),
  writerEnabled: makeSelectWriterEnabled(),
  rate: makeSelectRate(),
  loading: makeSelectLoading(),
});

function mapDispatchToProps(dispatch) {
  return {
    fetchExchangeRate: () => dispatch(fetchExchangeRate()),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps
);

const withReducer = injectReducer({ key: 'Exchange', reducer });
const withSaga = injectSaga({ key: 'Exchange', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect
)(Exchange);
