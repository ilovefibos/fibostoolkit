/*
 * HomePage Messages
 *
 * This contains all the text for the HomePage component.
 */
import { defineMessages } from 'react-intl';

export default defineMessages({
  gettingStarted: {
    id: 'app.components.Information.Home.gettingsStarted',
    defaultMessage: 'Getting started',
  },
  mustInstallIronman: {
    id: 'app.components.Information.Home.mustInstallIronman',
    defaultMessage: 'You must have {ironman} installed to safely and securely send transactions to the FO Network.',
  },
  participateCommunity: {
    id: 'app.components.Information.Home.participateCommunity',
    defaultMessage:
      'If you would like to ask us questions are participate in the FO Community, check out our {telegram} group.',
  },
  telegram: {
    id: 'app.components.Information.Home.telegram',
    defaultMessage: 'Telegram',
  },
});
