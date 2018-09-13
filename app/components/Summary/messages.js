/*
 * HomePage Messages
 *
 * This contains all the text for the HomePage component.
 */
import { defineMessages } from 'react-intl';

export default defineMessages({
  attachAccount: {
    id: 'app.components.Summary.attachAccount',
    defaultMessage: 'Attach an Account',
  },
  loadAccount: {
    id: 'app.components.Summary.loadAccount',
    defaultMessage: 'Load an account to view your resource utilitization and balances.',
  },
  selectOne: {
    id: 'app.components.Summary.selectOne',
    defaultMessage:
      'If your account details keep disappearing it is because many networks are close to you. Select one manually by clicking "Change Network" to prevent this.',
  },
  smartTokens: {
    id: 'app.components.Summary.smartTokens',
    defaultMessage: 'Smart Tokens',
  },
  contractWallet: {
    id: 'app.components.Summary.contractWallet',
    defaultMessage: 'Contract Wallet',
  },
  refunding: {
    id: 'app.components.Summary.refunding',
    defaultMessage: 'REFUNDING',
  },
  none: {
    id: 'app.components.Summary.none',
    defaultMessage: 'None',
  },
  used: {
    id: 'app.components.Summary.used',
    defaultMessage: 'used',
  },
  owned: {
    id: 'app.components.Summary.owned',
    defaultMessage: 'owned',
  },
  cpu: {
    id: 'app.components.Summary.cpu',
    defaultMessage: 'CPU',
  },
  ram: {
    id: 'app.components.Summary.ram',
    defaultMessage: 'RAM',
  },
  net: {
    id: 'app.components.Summary.net',
    defaultMessage: 'NET',
  },
});
