import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';
import Button from '@material-ui/core/Button';

import { noop } from "../../../utils";

const AppHeader = ({ account, handleLogin }) => {
  return (
    <div className="app-header-container" id="app-header">
      <div className="app-name-wrapper">
        {/* <img src={LotteryIcon} className="app-icon" alt="app-icon" /> */}
        <div className="app-name">DeNFT</div>
      </div>
      <div className="menu-items">
      </div>
      <div className="wallet-connection">
        <div className="wallet-address">{account && account.sub}</div>
        <Button
          basic
          onClick={(event) => handleLogin(event)}
          className="autorize-btn"
        >
          {/* <img src={UDIcon} className="ud-icon" alt="udicon" /> */}
          <div>{account && Object.keys(account).length > 0 ? 'Disconnect' : 'Connect'}</div>
        </Button>
      </div>
    </div>
  );
};

AppHeader.propTypes = {
  account: PropTypes.string,
  admin: PropTypes.string,
  onConnectClick: PropTypes.func,
  handleLogin: PropTypes.func,
}

AppHeader.defaultProps =  {
  account: '',
  admin: '',
  onConnectClick: noop,
  handleLogin: noop,
}

export default withRouter(AppHeader);
