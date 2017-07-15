import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { bindActionCreators, dispatch } from 'redux';
// import RegOpzFlatGrid from '../RegOpzFlatGrid/RegOpzFlatGrid';
import InfoModal from '../InfoModal/InfoModal';
import ModalAlert from '../ModalAlert/ModalAlert';
import Collapsible from '../CollapsibleModified/Collapsible';
import {
  actionFetchRoles
} from '../../actions/RolesAction';
require('./ManageRoles.css');

class ManageRolesComponent extends Component {
  constructor(props) {
    super(props);
    this.dataSource = null;
  }

  componentWillMount() {
    this.props.fetchPermission();
  }

  render() {
    return(
      <div className="panel panel-default">
          { this.renderPermissions() }
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
      <div className="panel-body">
      {
        this.dataSource.map((item, index) => {
          console.log(index, item);
          return(
            <div className="row data-holder" key={ index }>
              <div className="col-md-3">
                <a href="#">
                  <h2>{ item.role }</h2>
                </a>
              </div>
              <div className="col-md-9 no-padding">
                {
                  item.permissions.map((perm, index) => {
                    return(
                      <Collapsible trigger={ perm.component } key={ index }>
                        <span className="btn btn-default">{ perm.permission }</span>
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
