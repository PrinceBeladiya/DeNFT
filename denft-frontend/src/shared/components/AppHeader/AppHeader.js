import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';
import Button from '@material-ui/core/Button';
import { noop } from "../../../utils";
import appIcon from '../../../assets/images/denft.png';
import UDIcon from '../../../assets/icons/UDIcon.png';
import MetamaskIcon from '../../../assets/icons/metamask.svg';

const menuItems = [
  {
    menuTitle: "Mint",
    path: "/mint"
  },
  {
    menuTitle: "My NFTs",
    path: "/my-nfts"
  },
  {
    menuTitle: "Buy Crypto",
    path: "/buy-crypto"
  }
];

const AppHeader = ({ account, handleLogin, history, onMenuItemClick }) => {
  return (
    <div className="app-header-container" id="app-header">
      <div className="app-name-wrapper">
        <div className="app-name" onClick={ () => history.push('/') }>
          <img alt="icon" className='image' src={appIcon} />DeNFT</div>
      </div>
      <div className="menu-items">
        {
          menuItems.map(menuItem => (
            <div
              className={`menu-item ${menuItem.path === window.location.pathname ? 'active' : ''}`}
              role='presentation'
              onClick={ () => onMenuItemClick(menuItem) }
            >
              {menuItem.menuTitle}
            </div>
          ))
        }
      </div>
      <div className="wallet-connection">
        <div className="wallet-address">{account && account.sub}</div>
        <Button
          basic
          onClick={(event) => handleLogin('unstoppable')}
          className="authorize-btn"
        >
          <img src={UDIcon} className="ud-icon" alt="udicon" />
          <div>{account && Object.keys(account).length > 0 ? 'Disconnect' : 'Connect with Unstoppable'}</div>
        </Button>
        <Button
          basic
          onClick={(event) => handleLogin('metamask')}
          className="authorize-btn"
        >
          <img src={MetamaskIcon} className="ud-icon" alt="udicon" />
          <div>{account && Object.keys(account).length > 0 ? 'Disconnect' : 'Connect'}</div>
        </Button>
      </div>
    </div>
  );
};

AppHeader.propTypes = {
  history: PropTypes.instanceOf(Object).isRequired,
  account: PropTypes.string,
  admin: PropTypes.string,
  onConnectClick: PropTypes.func,
  handleLogin: PropTypes.func,
}

AppHeader.defaultProps = {
  account: '',
  admin: '',
  onConnectClick: noop,
  handleLogin: noop,
}

export default withRouter(AppHeader);
