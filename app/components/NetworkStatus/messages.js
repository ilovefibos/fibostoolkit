/*
 * HomePage Messages
 *
 * This contains all the text for the HomePage component.
 */
import { defineMessages } from 'react-intl';

export default defineMessages({
  attachIdentity: {
    id: 'app.components.NetworkStatus.attachIdentity',
    defaultMessage: 'Please attach Identity',
  },
  installIronman: {
    id: 'app.components.NetworkStatus.installIronman',
    defaultMessage: 'Please install Ironman',
  },
  read: {
    id: 'app.components.NetworkStatus.read',
    defaultMessage: 'Read',
  },
  write: {
    id: 'app.components.NetworkStatus.write',
    defaultMessage: 'Write',
  },
  account: {
    id: 'app.components.NetworkStatus.account',
    defaultMessage: 'Account',
  },
  readMessage: {
    id: 'app.components.NetworkStatus.readMessage',
    defaultMessage:
      "If READ is not ticked, it means the selected mainnet endpoint could not be accessed. Either your internet is restricted or the selected endpoint is down. Try selecting a different endpoint via 'Change network' menu above.",
  },
  writerMessage: {
    id: 'app.components.NetworkStatus.writerMessage',
    defaultMessage:
      'If WRITE access is not ticked, make sure ironman is configured with a valid network and that network is also linked to your scatter identity.',
  },
  accountMessage: {
    id: 'app.components.NetworkStatus.accountMessage',
    defaultMessage:
      "If ACCOUNT is not ticked make sure to use the 'Select account' menu above and select a ironman identity and account to perform actions under.",
  },
});
