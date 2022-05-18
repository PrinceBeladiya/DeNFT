import React, { useEffect } from 'react';
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

const AppHeader = ({ account, setAccount, handleLogin, history, onMenuItemClick, login }) => {

  const user = () => {
    let string = account.sub;
    let length = string.length;
    let userAccount1 = '', userAccount2 = '';

    if (string !== undefined) {
      for (let i = 0; i < length; i++) {
        if (i < 5) {
          userAccount1 += string[i];
        } else if (i > (length - 4)) {
          userAccount2 += string[i];
        }
      }
    }

    if (userAccount1.length > 1)
      return userAccount1 + '...' + userAccount2;
  };
  
  return (
    <div className="app-header-container" id="app-header">
      <div className="app-name-wrapper">
        <div className="app-name" onClick={() => history.push('/')}>
          <img alt="icon" className='image' src={appIcon} />DeNFT</div>
      </div>
      <div className="menu-items">
        {
          menuItems.map(menuItem => (
            <div
              className={`menu-item ${menuItem.path === window.location.pathname ? 'active' : ''}`}
              role='presentation'
              onClick={() => onMenuItemClick(menuItem)}
            >
              {menuItem.menuTitle}
            </div>
          ))
        }
      </div>
      <div className="wallet-connection">
        <div className="wallet-address">
          { 
            account && account.sub ? user() : ''
          }
        </div>
        {
          account && Object.keys(account).length > 0 ?
            (login !== 'unstoppable' || login !== 'metamask') ?
              login === 'metamask' ?
                <Button
                  basic
                  onClick={(event) => handleLogin('metamask')}
                  className="authorize-btn"
                >
                  <img src={MetamaskIcon} className="ud-icon" alt="udicon" />
                  <div>{account && Object.keys(account).length > 0 ? 'Disconnect' : 'Connect'}</div>
                </Button>
                :
                <Button
                  basic
                  onClick={(event) => handleLogin('unstoppable')}
                  className="authorize-btn"
                >
                  <img src={UDIcon} className="ud-icon" alt="udicon" />
                  <div>{account && Object.keys(account).length > 0 ? 'Disconnect' : 'Connect with Unstoppable'}</div>
                </Button>
              :
              ''
            :
            <>
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
            </>
        }
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
