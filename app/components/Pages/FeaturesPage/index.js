/**
 *
 * FeaturesPage
 *
 */
import React from 'react';
import { NavLink } from 'react-router-dom';
// @material-ui/icons
import Info from '@material-ui/icons/Info';
import Favorite from '@material-ui/icons/Favorite';
import Tool from 'components/Tool/Tool';
import ToolSection from 'components/Tool/ToolSection';
import ToolBody from 'components/Tool/ToolBody';
import dashboardRoutes from 'routes/dashboard';
import HomeDoc from 'components/Information/Home';
import { injectIntl } from 'react-intl';
import withStyles from '@material-ui/core/styles/withStyles';
import { compose } from 'redux';
import messages from './messages';
import dashBoardMessages from '../../../routes/messages';
import News from '../../Information/News';

const FeaturesPage = props => (
  <Tool>
    <ToolSection lg={12}>
      <ToolBody
        style={{ background: 'bisque' }}
        color="rose"
        icon={Favorite}
        header={props.intl.formatMessage(messages.toolkitNewsHeader)}
        subheader={props.intl.formatMessage(messages.toolkitNewsSubHeader)}
      >
        <News style={{ background: 'bisque' }} />
      </ToolBody>
    </ToolSection>

    <ToolSection lg={12}>
      <ToolBody
        color="info"
        icon={Info}
        header={props.intl.formatMessage(messages.welcome)}
        subheader={props.intl.formatMessage(messages.welcomeSub)}
      >
        <HomeDoc />
      </ToolBody>
    </ToolSection>

    <ToolSection lg={4}>
      <ToolBody
        color="warning"
        icon={Favorite}
        header={props.intl.formatMessage(messages.favourites)}
      >
        {dashboardRoutes.map(
          ({
            icon,
            name,
            messageId,
            collapse,
            hide,
            redirect,
            path,
            views,
          }) => {
            if (!redirect && !hide && !collapse) {
              return (
                <NavLink to={path} key={`route-${path}`}>
                  <h4>
                    {props.intl.formatMessage(dashBoardMessages[messageId])}
                  </h4>
                </NavLink>
              );
            }
          },
        )}
      </ToolBody>
    </ToolSection>

    {dashboardRoutes.map(route => {
      if (route.collapse) {
        return (
          <ToolSection lg={4} key={`header-${route.name}`}>
            <ToolBody
              color="rose"
              icon={route.icon}
              header={props.intl.formatMessage(
                dashBoardMessages[route.messageId],
              )}
            >
              {route.views.map(view => (
                <NavLink to={view.path} key={`route-view-${view.path}`}>
                  <h4>
                    {props.intl.formatMessage(
                      dashBoardMessages[view.messageId],
                    )}
                  </h4>
                </NavLink>
              ))}
            </ToolBody>
          </ToolSection>
        );
      }
    })}
  </Tool>
);

export default compose(
  injectIntl,
  withStyles(withStyles),
)(FeaturesPage);
