import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import AppHeader from './AppHeader';
import * as landingActions from '../../../modules/landing/redux/actions';
import { uauth } from '../../../config';
import { showNotification } from '../../../utils/Notifications';
import { noop } from '../../../utils';

class AppHeaderContainer extends Component {

  handleLogin = async () => {
    const { account, setAccount } = this.props;
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
  }

  render() {
    const { account } = this.props;
    return (
      <AppHeader
        handleLogin={this.handleLogin}
        account={account}
      />
    )
  }
}

AppHeaderContainer.propTypes = {
  account: PropTypes.instanceOf(Object),
  setAccount: PropTypes.func,
};

AppHeaderContainer.defaultProps = {
  account: {},
  setAccount: noop,
};

const mapStateToProps = state => ({
  account: state.landing.uAuth,
});

const mapDispatchToProps = dispatch => ({
  setAccount: account => dispatch(landingActions.setAccount(account)),
});

export default connect(mapStateToProps, mapDispatchToProps)(AppHeaderContainer);
