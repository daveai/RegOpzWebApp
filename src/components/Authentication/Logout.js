import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { hashHistory } from 'react-router';
import { connect } from 'react-redux';
import { actionLogout } from '../../actions/LoginAction';

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
    hashHistory.push(encodeURI('/'));
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
