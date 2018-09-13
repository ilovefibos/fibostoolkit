/**
 *
 * AirgrabForm
 *
 */

import React from 'react';
// import styled from 'styled-components';

// @material-ui/core components
import withStyles from '@material-ui/core/styles/withStyles';

// @material-ui/icons
import Settings from '@material-ui/icons/Settings';
import { FormattedMessage, injectIntl } from 'react-intl';

// core components
import GridContainer from 'components/Grid/GridContainer';
import GridItem from 'components/Grid/GridItem';
import Card from 'components/Card/Card';
import CardHeader from 'components/Card/CardHeader';
import CardIcon from 'components/Card/CardIcon';
import CardBody from 'components/Card/CardBody';

import regularFormsStyle from 'assets/jss/regularFormsStyle';
import NetworkTable from './networks';
import { Notification } from '../../../containers/Notification';
import { compose } from 'redux';
import messages from './messages';

const NetworkForm = props => {
  const { classes, networks, active, selectNetwork } = props;
  const tableProps = { networks, active, selectNetwork };
  const github = (
    <a href="https://github.com/lowwor/fibos-networks" target="new">
      GitHub
    </a>
  );
  return (
    <GridContainer>
      <GridItem xs={12} sm={12} lg={12}>
        <Card>
          <CardHeader color="warning" icon>
            <CardIcon color="warning">
              <Settings />
            </CardIcon>
            <h4 className={classes.cardIconTitle}>{props.intl.formatMessage(messages.selectNetwork)}</h4>
          </CardHeader>
          <CardBody>
            <h6>
              <FormattedMessage
                id={messages.githubNetworks.id}
                values={{ github }}
                defaultMessage={messages.githubNetworks.defaultMessage}
              />
            </h6>
            <NetworkTable {...tableProps} />
          </CardBody>
        </Card>
      </GridItem>
    </GridContainer>
  );
};

export default compose(
  withStyles(regularFormsStyle),
  injectIntl
)(NetworkForm);
