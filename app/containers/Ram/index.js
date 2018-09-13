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
import { makeSelectLoading, makeSelectRamRate } from './selectors';
import { fetchRamRate } from './actions';
import reducer from './reducer';
import saga from './saga';
import RamForm from '../../components/Features/RamForm';

export class Ram extends React.Component {
  // eslint-disable-line react/prefer-stateless-function

  componentDidMount() {
    this.interval = setInterval(() => this.props.fetchRamRate(), 5000);
  }

  componentWillUpdate(nextProps) {
    if (this.props.readerEnabled !== nextProps.readerEnabled) {
      // start loading the reader asap
      this.props.fetchRamRate();
    }
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  render() {
    return <RamForm {...this.props} />;
  }
}

const mapStateToProps = createStructuredSelector({
  readerEnabled: makeSelectReaderEnabled(),
  writerEnabled: makeSelectWriterEnabled(),
  ramRate: makeSelectRamRate(),
  loading: makeSelectLoading(),
});

function mapDispatchToProps(dispatch) {
  return {
    fetchRamRate: () => dispatch(fetchRamRate()),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps
);

const withReducer = injectReducer({ key: 'Ram', reducer });
const withSaga = injectSaga({ key: 'Ram', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect
)(Ram);
