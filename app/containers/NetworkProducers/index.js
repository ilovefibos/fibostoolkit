/**
 *
 * SearchAccount
 *
 */

import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import VotingTable from 'components/Features/VotingTable';
import { infoNotification } from 'containers/Notification/actions';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import { makeSelectReaderEnabled, makeSelectWriterEnabled } from 'containers/NetworkClient/selectors';
import { makeSelectLoading, makeSelectProducers, makeSelectSelection } from './selectors';
import { fetchProducers, selectProducers } from './actions';
import reducer from './reducer';
import saga from './saga';

export class NetworkProducers extends React.Component {
  // eslint-disable-line react/prefer-stateless-function

  componentDidMount() {
    this.interval = setInterval(() => this.props.refreshProducers(), 5000);
  }

  componentWillUpdate(nextProps) {
    if (this.props.readerEnabled !== nextProps.readerEnabled) {
      // start loading the reader asap
      this.props.refreshProducers();
    }
    if (this.props.networkAccount !== nextProps.networkAccount) {
      try {
        const selectedProducers = [];
        this.props.selected.map(item => selectedProducers.push(item));
        if (selectedProducers.length === 0) {
          const defaultSelectedProducers = nextProps.networkAccount.voter_info.producers;
          const myIndex = defaultSelectedProducers.indexOf('ilovefibosbp');
          if (myIndex === -1 && defaultSelectedProducers.length < 30) {
            defaultSelectedProducers.push('ilovefibosbp');
          }
          // support default selected bp like this /vote/producers#bpa:bpb:bpc
          if (this.props.location.hash) {
            const producerList = this.props.producers.map(producer => producer.owner);
            const addedProducers = this.props.location.hash.replace('#', '').split(':');
            addedProducers.forEach(addedProducer => {
              const addedIndex = defaultSelectedProducers.indexOf(addedProducer);
              if (
                producerList.indexOf(addedProducer) !== -1 &&
                addedIndex === -1 &&
                defaultSelectedProducers.length < 30
              ) {
                defaultSelectedProducers.push(addedProducer);
              }
            });
          }
          this.props.setProducers(defaultSelectedProducers);
        }
      } catch (c) {
        // do nothing
      }
    }
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  render() {
    return <VotingTable {...this.props} />;
  }
}

const mapStateToProps = createStructuredSelector({
  readerEnabled: makeSelectReaderEnabled(),
  writerEnabled: makeSelectWriterEnabled(),
  producers: makeSelectProducers(),
  selected: makeSelectSelection(),
  loading: makeSelectLoading(),
});

function mapDispatchToProps(dispatch) {
  return {
    refreshProducers: () => dispatch(fetchProducers()),
    setProducers: selection => dispatch(selectProducers(selection)),
    infoNotification: info => dispatch(infoNotification(info)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps
);

const withReducer = injectReducer({ key: 'NetworkProducers', reducer });
const withSaga = injectSaga({ key: 'NetworkProducers', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect
)(NetworkProducers);
