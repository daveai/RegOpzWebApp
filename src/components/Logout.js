import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { actionLogout } from '../actions/LoginAction';

class LogOutComponent extends Component {
  render() {
    return (
      <a href="#" onClick={this.onLogOut.bind(this)}>
        <i className="fa fa-sign-out pull-right"></i>
        Log Out
      </a>
    );
  }

  onLogOut(event) {
    event.preventDefault();
    this.props.logout();
    window.location.replace('/#/login');
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    logout: () => {
      dispatch(actionLogout());
    }
  }
}

const VisibleLogOut = connect(
  null,
  mapDispatchToProps
)(LogOutComponent);

export default VisibleLogOut;
