import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import {
  makeSelectSigner,
  makeSelectIdentity,
} from 'containers/NetworkClient/selectors';
import { compose } from 'redux';
import { injectIntl } from 'react-intl';
import messages from './messages';

const NetworkIdentity = props => {
  const { signer, identity } = props;
  if (signer && !identity)
    return props.intl.formatMessage(messages.attachIdentity);
  if (signer && identity) return `${identity.name}@${identity.authority}`;
  return props.intl.formatMessage(messages.installPluginWallet);
};

const mapStateToProps = createStructuredSelector({
  signer: makeSelectSigner(),
  identity: makeSelectIdentity(),
});
export default compose(
  connect(
    mapStateToProps,
    null,
  ),
  injectIntl,
)(NetworkIdentity);
