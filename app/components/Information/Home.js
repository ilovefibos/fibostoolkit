import React from 'react';
import { FormattedMessage, injectIntl } from 'react-intl';
import { compose } from 'redux';
import messages from './messages';

const Home = props => {
  const ironman = (
    <a href="http://foironman.com/" target="new">
      Ironman
    </a>
  );
  const telegram = (
    <a href="https://t.me/FIBOSIO" target="new">
      {props.intl.formatMessage(messages.telegram)}
    </a>
  );
  return (
    <div>
      <h3>{props.intl.formatMessage(messages.gettingStarted)}</h3>
      <h4>
        <FormattedMessage
          id={messages.mustInstallIronman.id}
          values={{ ironman }}
          defaultMessage={messages.mustInstallIronman.defaultMessage}
        />
      </h4>

      <h4>
        <FormattedMessage
          id={messages.participateCommunity.id}
          values={{ telegram }}
          defaultMessage={messages.participateCommunity.defaultMessage}
        />
      </h4>
      {/* <h4>Make sure you have read and understand the <NavLink to="/governance">FO Governance</NavLink> prior to using the FO Network.</h4> */}
    </div>
  );
};

export default compose(injectIntl)(Home);
