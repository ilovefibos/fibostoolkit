/**
 *
 * Airgrab
 *
 */
import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import NetworkForm from 'components/Features/NetworkForm';
import { makeSelectNetworks, makeSelectActiveNetwork } from 'containers/NetworkClient/selectors';
import { setNetwork, updateLatencies } from 'containers/NetworkClient/actions';

export class Network extends React.Component {
  // eslint-disable-line react/prefer-stateless-function

  componentDidMount() {
    this.props.updateLatencies();
    this.interval = setInterval(() => this.props.updateLatencies(), 5000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  render() {
    return <NetworkForm {...this.props} />;
  }
}

const mapStateToProps = createStructuredSelector({
  networks: makeSelectNetworks(),
  active: makeSelectActiveNetwork(),
});

function mapDispatchToProps(dispatch) {
  return {
    updateLatencies: () => dispatch(updateLatencies()),
    selectNetwork: (network, endpoint) => dispatch(setNetwork({ network, endpoint }, true)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps
);

export default compose(withConnect)(Network);
