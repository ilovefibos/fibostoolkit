/**
 *
 * App
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 */

import React from 'react';
import { Helmet } from 'react-helmet';
import styled from 'styled-components';
import { Switch, Route } from 'react-router-dom';

import indexRoutes from 'routes/index';

import './material-dashboard-pro-react.css';
import GlobalStyle from '../../global-styles';

const AppWrapper = styled.div``;

export default class App extends React.Component {
  componentDidMount() {
    if (document.querySelector('#load')) {
      document.querySelector('#load').remove();
    }
  }

  render() {
    return (
      <AppWrapper>
        <Helmet
          titleTemplate="%s - FOToolkit.com"
          defaultTitle="FOToolkit.com | All in one FO web wallet"
        >
          <meta
            name="description"
            content="FOToolkit is the premier free, open source interface for managing FO accounts. Create, transfer, stake, vote and more with Scatter! Checkout cool community..."
          />
        </Helmet>
        <Switch>
          {indexRoutes.map(({ component, name, path }) => (
            <Route path={path} component={component} key={name} />
          ))}
        </Switch>
        <GlobalStyle />
      </AppWrapper>
    );
  }
}
