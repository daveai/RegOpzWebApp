import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { hashHistory, Link } from 'react-router';
import { connect } from 'react-redux';
import { bindActionCreators, dispatch } from 'redux';
import Collapsible from '../CollapsibleModified/Collapsible';
import {
  actionFetchRoles
} from '../../actions/RolesAction';
require('./ManageRoles.css');

class ManageRolesComponent extends Component {
  constructor(props) {
    super(props);
    this.dataSource = null;
    this.addRoles = this.addRoles.bind(this);
  }

  componentWillMount() {
    this.props.fetchPermission();
  }

  addRoles(e) {
      const encodedUrl = encodeURI('/dashboard/manage-roles/add-roles');
      hashHistory.push(encodedUrl);
  }

  render() {
    return(
      <div className="panel panel-default">
        <div className="panel-body">
          { this.renderPermissions() }
        </div>
        <div className="panel-footer">
          <button type="button" className="btn btn-success" onClick={ this.addRoles }>
            Add New Role
          </button>
        </div>
      </div>
    );
  }

  renderPermissions() {
    this.dataSource = this.props.permissionList;

    if(this.dataSource == null) {
      return(
        <h1>Loading...</h1>
      );
    } else if(this.dataSource.length == 0) {
        return(
          <h1>No data found!</h1>
        );
    }

    return(
      <div className="container-fluid">
      {
        this.dataSource.map((item, index) => {
          console.log(index, item);
          return(
            <div className="row data-holder" key={ index }>
              <div className="col-md-3">
                <Link to={`/dashboard/manage-roles/add-roles?role=${ item.role }`}>
                  <h2>{ item.role }</h2>
                </Link>
              </div>
              <div className="col-md-9 no-padding">
                {
                  item.permissions.map((perm, index) => {
                    return(
                      <Collapsible trigger={ perm.component } key={ index }>
                        <span className="label label-success">{ perm.permission }</span>
                      </Collapsible>
                    );
                  })
                }
              </div>
            </div>
            );
          })
        }
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    permissionList: state.role_management.data
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchPermission: () => {
      dispatch(actionFetchRoles());
    }
  };
};

const VisibleRoleManager = connect(
  mapStateToProps,
  mapDispatchToProps
)(ManageRolesComponent);

export default VisibleRoleManager;
