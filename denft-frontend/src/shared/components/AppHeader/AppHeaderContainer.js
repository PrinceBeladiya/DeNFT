import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

import AppHeader from './AppHeader';
import * as landingActions from '../../../modules/landing/redux/actions';
import * as dashboardActions from '../../../modules/dashboard/redux/actions';
import { uauth } from '../../../config';
import { showNotification } from '../../../utils/Notifications';
import { noop } from '../../../utils';

class AppHeaderContainer extends Component {

  handleLogin = async (wallet) => {
    const { account, setAccount } = this.props;
    if (wallet === 'unstoppable') {
      if (account && Object.keys(account) && Object.keys(account).length > 0) {
        uauth
          .logout()
          .then(() => setAccount(undefined))
          .catch(error => showNotification(error.message, 'error', 3000))
      } else {
        await uauth
          .loginWithPopup()
          .then(() => uauth.user().then(setUser => setAccount(setUser)))
          .catch(error => showNotification(error.message, 'error', 3000))
      }
    } else if (wallet === 'metamask') {
      await window.ethereum.send('eth_requestAccounts');
    }
  }

  onMenuItemClick = (selectedMenuItem) => {
    const { history, setSelectedMenuItem } = this.props;
    history.push(selectedMenuItem && selectedMenuItem.path);
    setSelectedMenuItem(selectedMenuItem);
  }

  render() {
    const { account } = this.props;
    return (
      <AppHeader
        handleLogin={this.handleLogin}
        account={account}
        onMenuItemClick={this.onMenuItemClick}
      />
    )
  }
}

AppHeaderContainer.propTypes = {
  history: PropTypes.instanceOf(Object).isRequired,
  account: PropTypes.instanceOf(Object),
  setAccount: PropTypes.func,
  setSelectedMenuItem: PropTypes.func,
};

AppHeaderContainer.defaultProps = {
  account: {},
  setAccount: noop,
  setSelectedMenuItem: noop,
};

const mapStateToProps = state => ({
  account: state.landing.uAuth,
});

const mapDispatchToProps = dispatch => ({
  setAccount: account => dispatch(landingActions.setAccount(account)),
  setSelectedMenuItem: menuItem => dispatch(dashboardActions.setSelectedMenuItem(menuItem)),
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(AppHeaderContainer));
