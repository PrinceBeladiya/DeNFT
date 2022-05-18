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
import { toast } from 'react-toastify';

class AppHeaderContainer extends Component {

  state = {
    login : '',
  }

  handleLogin = async (wallet) => {

    const { account, setAccount } = this.props;
    this.setState({ login : wallet});

    if (wallet === 'unstoppable') {
      if (account && Object.keys(account) && Object.keys(account).length > 0) {
        uauth
          .logout()
          .then(() => setAccount(undefined))
          .catch(error => showNotification(error.message, 'error', 3000))

          this.setState({ login : ''});
      } else {
        await uauth
          .loginWithPopup()
          .then(() => uauth.user().then(setUser => setAccount(setUser)))
          .catch(error => showNotification(error.message, 'error', 3000))
      }
    } else if (wallet === 'metamask') {
      await window.ethereum.enable();
      const { ethereum } = window;

      if (!ethereum) {
        toast.warning("Please first install metamask");
        return;
      }

      if (account && Object.keys(account) && Object.keys(account).length > 0) {
        setAccount(undefined);
        this.setState({ login : ''});
      } else {
        setAccount({
          sub: ethereum.selectedAddress,
          wallet_address: ethereum.selectedAddress,
        });
      }
    }
  }

  onMenuItemClick = (selectedMenuItem) => {
    const { history, setSelectedMenuItem } = this.props;
    history.push(selectedMenuItem && selectedMenuItem.path);
    setSelectedMenuItem(selectedMenuItem);
  }

  render() {
    const { account, setAccount } = this.props;
    return (
      <AppHeader
        handleLogin={this.handleLogin}
        account={account}
        setAccount={setAccount}
        onMenuItemClick={this.onMenuItemClick}
        login={this.state.login}
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
  setCurrentAccount: account => dispatch(landingActions.updateAccount(account)),
  setSelectedMenuItem: menuItem => dispatch(dashboardActions.setSelectedMenuItem(menuItem)),
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(AppHeaderContainer));
