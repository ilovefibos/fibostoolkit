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
    const selectedProducers = [];
    // push already selected producers

    if (this.props.networkAccount && this.props.networkAccount.voter_info) {
      const accountSelectedProducers = this.props.networkAccount.voter_info.producers;
      accountSelectedProducers.forEach(item => {
        if (selectedProducers.indexOf(item) === -1 && selectedProducers.length < 30) {
          selectedProducers.push(item);
        }
      });
    }

    if (selectedProducers.indexOf('ilovefibosbp') === -1 && selectedProducers.length < 30) {
      selectedProducers.push('ilovefibosbp');
    }
    // support default selected bp like this /vote/producers#bpa:bpb:bpc
    if (this.props.location.hash) {
      let hashProducers = [];
      if (this.props.location.hash.indexOf(':') === -1) {
        hashProducers.push(this.props.location.hash.replace('#', ''));
      } else {
        hashProducers = this.props.location.hash.replace('#', '').split(':');
      }
      hashProducers.forEach(hashProducer => {
        if (selectedProducers.indexOf(hashProducer) === -1 && selectedProducers.length < 30) {
          selectedProducers.push(hashProducer);
        }
      });
    }
    this.props.setProducers(selectedProducers);
    this.interval = setInterval(() => this.props.refreshProducers(), 5000);
  }

  componentWillUpdate(nextProps) {
    if (this.props.readerEnabled !== nextProps.readerEnabled) {
      // start loading the reader asap
      this.props.refreshProducers();
    }
    // account detach, reset to default producer
    if (this.props.networkAccount !== null && nextProps.networkAccount === null) {
      try {
        const selectedProducers = ['ilovefibosbp'];
        // support default selected bp like this /vote/producers#bpa:bpb:bpc
        if (this.props.location.hash) {
          let hashProducers = [];
          if (this.props.location.hash.indexOf(':') === -1) {
            hashProducers.push(this.props.location.hash.replace('#', ''));
          } else {
            hashProducers = this.props.location.hash.replace('#', '').split(':');
          }
          hashProducers.forEach(hashProducer => {
            if (selectedProducers.indexOf(hashProducer) === -1 && selectedProducers.length < 30) {
              selectedProducers.push(hashProducer);
            }
          });
        }
        this.props.setProducers(selectedProducers);
      } catch (c) {
        // do nothing
        console.log(c);
      }
    }

    // account attach, add account voted producer
    if (this.props.networkAccount === null && nextProps.networkAccount !== null) {
      const selectedProducers = [];
      // push already selected producers
      this.props.selected.forEach(item => {
        if (selectedProducers.indexOf(item) === -1 && selectedProducers.length < 30) {
          selectedProducers.push(item);
        }
      });

      // push account selected producers
      if (nextProps.networkAccount.voter_info) {
        const accountSelectedProducers = nextProps.networkAccount.voter_info.producers;
        accountSelectedProducers.forEach(item => {
          if (selectedProducers.indexOf(item) === -1 && selectedProducers.length < 30) {
            selectedProducers.push(item);
          }
        });
      }
      this.props.setProducers(selectedProducers);
    }

    // remove not exists producers
    if (this.props.producers.size !== nextProps.producers.size) {
      const selectedProducers = [];
      this.props.selected.forEach(item => {
        if (selectedProducers.indexOf(item) === -1 && selectedProducers.length < 30) {
          selectedProducers.push(item);
        }
      });
      // remove not exists producers
      selectedProducers.forEach(item => {
        if (this.props.producers.indexOf(item) === -1) {
          selectedProducers.splice(selectedProducers.indexOf(item));
        }
      });
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
