/* eslint-disable react/no-string-refs */
import React from 'react';
import PropTypes from 'prop-types';
// javascript plugin used to create scrollbars on windows
import { NavLink } from 'react-router-dom';
import { createStructuredSelector } from 'reselect';
import cx from 'classnames';
import { intlShape, injectIntl, defineMessages } from 'react-intl';
import messages from './messages';
import dashBoardMessages from '../../routes/messages';

// @material-ui/core components
import withStyles from '@material-ui/core/styles/withStyles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Hidden from '@material-ui/core/Hidden';
import Collapse from '@material-ui/core/Collapse';
import AddBox from '@material-ui/icons/AddBox';
import ExitToApp from '@material-ui/icons/ExitToApp';
import SettingsApplications from '@material-ui/icons/SettingsApplications';
import Autorenew from '@material-ui/icons/Autorenew';
import Language from '@material-ui/icons/Language';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { makeSelectOffline, makeSelectIdentity } from 'containers/NetworkClient/selectors';
import { makeSelectLocale } from 'containers/LanguageProvider/selectors';
import { setIdentity, disableWriter, toggleOffline } from 'containers/NetworkClient/actions';
import { changeLocale } from 'containers/LanguageProvider/actions';
import NetworkIdentity from 'components/NetworkStatus/Identity';
import NetworkStatus from 'components/NetworkStatus/Status';
import VoteUs from 'components/Features/VoteUs';
import GenereosIcon from 'components/Icons/Genereos';
// core components
import HeaderLinks from 'components/Header/HeaderLinks';

import avatar from 'assets/img/pluginWallet.png';

import SidebarWrapper from './SidebarWrapper';
import sidebarStyle from './sidebarStyle';

class Sidebar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      openAvatar: false,
      openAccount: this.activeRoute('/account'),
      openCrossChain: this.activeRoute('/cross'),
      openSmartToken: this.activeRoute('/smarttoken'),
      openContractWallet: this.activeRoute('/contractwallet'),
      openVote: this.activeRoute('/vote'),
      openCommunity: this.activeRoute('/community'),
      openMultisig: this.activeRoute('/multisig'),
      openBlockProducer: this.activeRoute('/block-producer'),
      miniActive: true,
    };
    this.activeRoute.bind(this);
  }
  // verifies if routeName is the one active (in browser input)
  activeRoute(routeName) {
    return this.props.location.pathname.indexOf(routeName) > -1;
  }
  openCollapse(collapse) {
    const st = {};
    st[collapse] = !this.state[collapse];
    this.setState(st);
  }

  render() {
    const { classes, color, logo, image, logoText, routes, bgColor, rtlActive } = this.props;
    const itemText = `${classes.itemText} ${cx({
      [classes.itemTextMini]: this.props.miniActive && this.state.miniActive,
      [classes.itemTextMiniRTL]: rtlActive && this.props.miniActive && this.state.miniActive,
      [classes.itemTextRTL]: rtlActive,
    })}`;
    const collapseItemText = `${classes.collapseItemText} ${cx({
      [classes.collapseItemTextMini]: this.props.miniActive && this.state.miniActive,
      [classes.collapseItemTextMiniRTL]: rtlActive && this.props.miniActive && this.state.miniActive,
      [classes.collapseItemTextRTL]: rtlActive,
    })}`;
    const userWrapperClass = `${classes.user} ${cx({
      [classes.whiteAfter]: bgColor === 'white',
    })}`;
    const caret = `${classes.caret} ${cx({
      [classes.caretRTL]: rtlActive,
    })}`;
    const photo = `${classes.photo} ${cx({
      [classes.photoRTL]: rtlActive,
    })}`;
    const user = (
      <div className={userWrapperClass}>
        <div className={photo}>
          <img src={avatar} className={classes.avatarImg} alt="..." />
        </div>
        <List className={classes.list}>
          <ListItem className={`${classes.item} ${classes.userItem}`}>
            <NavLink
              to={'#'}
              className={`${classes.itemLink} ${classes.userCollapseButton}`}
              onClick={() => this.openCollapse('openAvatar')}>
              <ListItemText
                primary={<NetworkIdentity />}
                disableTypography
                className={`${itemText} ${classes.userItemText}`}
              />
            </NavLink>
          </ListItem>
          <ListItem className={classes.item} onClick={this.props.identity ? this.props.onLogout : this.props.onLogin}>
            <NavLink to="#" className={`${classes.itemLink}`}>
              <ListItemIcon className={classes.itemIconMini}>
                {this.props.identity ? <ExitToApp /> : <AddBox />}
              </ListItemIcon>
              <ListItemText
                primary={
                  this.props.identity
                    ? this.props.intl.formatMessage(messages.detachAccount)
                    : this.props.intl.formatMessage(messages.attachAccount)
                } // TODO: Make this international
                disableTypography
                className={collapseItemText}
              />
            </NavLink>
          </ListItem>
          <ListItem className={classes.item}>
            <NavLink to="/networks" className={`${classes.itemLink}`}>
              <ListItemIcon className={classes.itemIconMini}>
                <SettingsApplications />
              </ListItemIcon>
              <ListItemText
                primary={this.props.intl.formatMessage(messages.changeNetwork)} // TODO: Make this international
                disableTypography
                className={collapseItemText}
              />
            </NavLink>
          </ListItem>
          <ListItem className={classes.item} onClick={this.props.toggleOffline}>
            <NavLink to="#" className={`${classes.itemLink}`}>
              <ListItemIcon className={classes.itemIconMini}>
                <Autorenew />
              </ListItemIcon>
              <ListItemText
                primary={
                  this.props.offlineMode
                    ? this.props.intl.formatMessage(messages.multisigMode)
                    : this.props.intl.formatMessage(messages.singlesigMode)
                } // TODO: Make this international
                disableTypography
                className={collapseItemText}
              />
            </NavLink>
          </ListItem>
          <ListItem
            className={classes.item}
            onClick={() => {
              const locale = this.props.locale;
              this.props.changeLocale(locale === 'en' ? 'zh' : 'en');
            }}>
            <NavLink to="#" className={`${classes.itemLink}`}>
              <ListItemIcon className={classes.itemIconMini}>
                <Language />
              </ListItemIcon>
              <ListItemText
                primary={this.props.intl.formatMessage(messages.language)} // TODO: Make this international
                disableTypography
                className={collapseItemText}
              />
            </NavLink>
          </ListItem>
        </List>
      </div>
    );
    const status = (
      <List className={classes.list}>
        <ListItem className={classes.item}>
          <ListItemText primary={<NetworkStatus />} className={classes.statusText} disableTypography />
        </ListItem>
      </List>
    );
    const vote = (
      <List className={classes.list} style={{ marginBottom: '-20px' }}>
        <ListItem className={classes.item}>
          <div className={classes.itemLink}>
            <ListItemIcon className={classes.itemIcon}>
              <GenereosIcon />
            </ListItemIcon>
            <ListItemText
              primary={<VoteUs className={classes.itemText} />}
              disableTypography
              className={classes.itemText}
            />
          </div>
        </ListItem>
      </List>
    );
    const links = (
      <List className={classes.list}>
        {routes.map(prop => {
          if (prop.hide) {
            return null;
          }
          if (prop.redirect) {
            return null;
          }
          if (prop.collapse) {
            const navLinkClasses = `${classes.itemLink} ${cx({
              [` ${classes.collapseActive}`]:
                this.activeRoute(prop.path) && this.props.location.pathname !== '/account/create',
            })}`;
            const listItemTextClass = `${classes.itemText} ${cx({
              [classes.itemTextMini]: this.props.miniActive && this.state.miniActive,
              [classes.itemTextMiniRTL]: rtlActive && this.props.miniActive && this.state.miniActive,
              [classes.itemTextRTL]: rtlActive,
            })}`;
            const collapseItemTextClass = `${classes.collapseItemText} ${cx({
              [classes.collapseItemTextMini]: this.props.miniActive && this.state.miniActive,
              [classes.collapseItemTextMiniRTL]: rtlActive && this.props.miniActive && this.state.miniActive,
              [classes.collapseItemTextRTL]: rtlActive,
            })}`;
            const itemIcon = `${classes.itemIcon} ${cx({
              [classes.itemIconRTL]: rtlActive,
            })}`;
            const caretLink = `${classes.caret} ${cx({
              [classes.caretRTL]: rtlActive,
            })}`;
            return (
              <ListItem key={`list-item-${prop.path}`} className={classes.item}>
                <NavLink to={'#'} className={navLinkClasses} onClick={() => this.openCollapse(prop.state)}>
                  <ListItemIcon className={itemIcon}>
                    <prop.icon />
                  </ListItemIcon>
                  <ListItemText
                    primary={this.props.intl.formatMessage(dashBoardMessages[prop.messageId])}
                    secondary={<b className={`${caretLink} ${this.state[prop.state] ? classes.caretActive : ''}`} />}
                    disableTypography
                    className={listItemTextClass}
                  />
                </NavLink>
                <Collapse in={this.state[prop.state]} unmountOnExit>
                  <List className={`${classes.list} ${classes.collapseList}`}>
                    {prop.views.map(viewProp => {
                      if (viewProp.redirect) {
                        return null;
                      }
                      const navLinkCollapseClasses = `${classes.collapseItemLink} ${cx({
                        [` ${classes[color]}`]: this.activeRoute(viewProp.path),
                      })}`;
                      const collapseItemMini = `${classes.collapseItemMini} ${cx({
                        [classes.collapseItemMiniRTL]: rtlActive,
                      })}`;
                      return (
                        <ListItem key={`list-item-collapse-${viewProp.path}`} className={classes.collapseItem}>
                          <NavLink
                            to={viewProp.path}
                            className={navLinkCollapseClasses}
                            onClick={this.props.handleDrawerToggle}>
                            <span className={collapseItemMini}>{viewProp.mini}</span>
                            <ListItemText
                              primary={this.props.intl.formatMessage(dashBoardMessages[viewProp.messageId])}
                              disableTypography
                              className={collapseItemTextClass}
                            />
                          </NavLink>
                        </ListItem>
                      );
                    })}
                  </List>
                </Collapse>
              </ListItem>
            );
          }
          const navLinkClasses = `${classes.itemLink} ${cx({
            [` ${classes[color]}`]: this.activeRoute(prop.path),
          })}`;
          const itemTextLink = `${classes.itemText} ${cx({
            [classes.itemTextMini]: this.props.miniActive && this.state.miniActive,
            [classes.itemTextMiniRTL]: rtlActive && this.props.miniActive && this.state.miniActive,
            [classes.itemTextRTL]: rtlActive,
          })}`;
          const itemIcon = `${classes.itemIcon} ${cx({
            [classes.itemIconRTL]: rtlActive,
          })}`;
          return (
            <ListItem key={`list-${prop.path}`} className={classes.item}>
              <NavLink to={prop.path} className={navLinkClasses} onClick={this.props.handleDrawerToggle}>
                <ListItemIcon className={itemIcon}>
                  <prop.icon />
                </ListItemIcon>
                <ListItemText
                  primary={this.props.intl.formatMessage(dashBoardMessages[prop.messageId])}
                  disableTypography
                  className={itemTextLink}
                />
              </NavLink>
            </ListItem>
          );
        })}
      </List>
    );

    const logoNormal = `${classes.logoNormal} ${cx({
      [classes.logoNormalSidebarMini]: this.props.miniActive && this.state.miniActive,
      [classes.logoNormalSidebarMiniRTL]: rtlActive && this.props.miniActive && this.state.miniActive,
      [classes.logoNormalRTL]: rtlActive,
    })}`;
    const logoMini = `${classes.logoMini} ${cx({
      [classes.logoMiniRTL]: rtlActive,
    })}`;
    const logoClasses = `${classes.logo} ${cx({
      [classes.whiteAfter]: bgColor === 'white',
    })}`;
    const brand = (
      <div className={logoClasses}>
        <a href="http://www.ilovefibos.com" className={logoMini}>
          <img src={logo} alt="logo" className={classes.img} />
        </a>
        <a href="http://www.ilovefibos.com" className={logoNormal}>
          {logoText}
        </a>
      </div>
    );
    const drawerPaper = `${classes.drawerPaper} ${cx({
      [classes.drawerPaperMini]: this.props.miniActive && this.state.miniActive,
      [classes.drawerPaperRTL]: rtlActive,
    })}`;
    const sidebarWrapper = `${classes.sidebarWrapper} ${cx({
      [classes.drawerPaperMini]: this.props.miniActive && this.state.miniActive,
      [classes.sidebarWrapperWithPerfectScrollbar]: navigator.platform.indexOf('Win') > -1,
    })}`;
    return (
      <div ref="mainPanel">
        <Hidden mdUp>
          <Drawer
            variant="temporary"
            anchor={rtlActive ? 'left' : 'right'}
            open={this.props.open}
            classes={{
              paper: `${drawerPaper} ${classes[`${bgColor}Background`]}`,
            }}
            onClose={this.props.handleDrawerToggle}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}>
            {brand}
            <SidebarWrapper className={sidebarWrapper} user={user} status={status} links={links} headerLinks={vote} />
            {image !== undefined ? (
              <div className={classes.background} style={{ backgroundImage: `url(${image})` }} />
            ) : null}
          </Drawer>
        </Hidden>
        <Hidden smDown>
          <Drawer
            onMouseOver={() => this.setState({ miniActive: false })}
            onMouseOut={() => this.setState({ miniActive: true })}
            anchor={rtlActive ? 'right' : 'left'}
            variant="permanent"
            open
            classes={{
              paper: `${drawerPaper} ${classes[`${bgColor}Background`]}`,
            }}>
            {brand}
            <SidebarWrapper className={sidebarWrapper} user={user} links={links} status={status} />
            {image !== undefined ? (
              <div className={classes.background} style={{ backgroundImage: `url(${image})` }} />
            ) : null}
          </Drawer>
        </Hidden>
      </div>
    );
  }
}

Sidebar.defaultProps = {
  bgColor: 'blue',
};

Sidebar.propTypes = {
  classes: PropTypes.object.isRequired,
  bgColor: PropTypes.oneOf(['white', 'black', 'blue']),
  rtlActive: PropTypes.bool,
  color: PropTypes.oneOf(['white', 'red', 'orange', 'green', 'blue', 'purple', 'rose']),
  logo: PropTypes.string,
  logoText: PropTypes.string,
  image: PropTypes.string,
  routes: PropTypes.arrayOf(PropTypes.object),
  intl: intlShape.isRequired,
};

const mapStateToProps = createStructuredSelector({
  offlineMode: makeSelectOffline(),
  identity: makeSelectIdentity(),
  locale: makeSelectLocale(),
});

function mapDispatchToProps(dispatch) {
  return {
    onLogin: () => dispatch(setIdentity()),
    onLogout: () => dispatch(disableWriter()),
    toggleOffline: () => dispatch(toggleOffline()),
    changeLocale: locale => dispatch(changeLocale(locale)),
  };
}

export default compose(
  withStyles(sidebarStyle),
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  injectIntl
)(Sidebar);
