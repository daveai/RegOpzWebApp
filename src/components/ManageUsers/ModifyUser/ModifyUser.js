import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { hashHistory, Link } from 'react-router';
import { connect } from 'react-redux';
import { bindActionCreators, dispatch } from 'redux';
import { Label, Button, Modal, Checkbox } from 'react-bootstrap';
import Breadcrumbs from 'react-breadcrumbs';
import {
  actionUpdateUsers,
  actionDeleteUser
} from '../../../actions/UsersAction';

class ModifyUser extends Component {
    constructor(props) {
        super(props);
        this.userIndex = this.props.location.query['userId'];
    }

    render() {
        return(
            <div>
              <Breadcrumbs
                routes={this.props.routes}
                params={this.props.params}
                wrapperClass="breadcrumb"
              />
              { this.renderForm() }
            </div>
        );
    }

    renderForm() {
        return(<span>{ this.userIndex }</span>)
    }
}

export default ModifyUser;
