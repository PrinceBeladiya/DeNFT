import React, { Component } from 'react';
import { connect } from 'react-redux';

import AppHeader from './AppHeader';

class AppHeaderContainer extends Component {

  handleLogin = () => {
  }

  render() {
    return (
      <AppHeader
        handleLogin={this.handleLogin}
      />
    )
  }
}

const mapStateToProps = state => ({
});

const mapDispatchToProps = dispatch => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(AppHeaderContainer);
