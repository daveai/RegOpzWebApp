import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { hashHistory, Link } from 'react-router';
import { connect } from 'react-redux';
import { bindActionCreators, dispatch } from 'redux';
import { Label, Button, Modal, Checkbox } from 'react-bootstrap';
import Breadcrumbs from 'react-breadcrumbs';
import {
  actionFetchUsers
} from '../../actions/UsersAction';
require('./ManageUsers.css');


class ManageUsersComponent extends Component {
  constructor(props) {
    super(props);
    this.dataSource = null;
    this.fetchFlag = true;
  }

  componentWillMount() {
    this.props.fetchUsers();
  }

  componentWillUpdate() {
    if (this.fetchFlag){
      this.props.fetchUsers();
    }
  }

  componentDidUpdate(){
    this.fetchFlag =! this.fetchFlag;
  }

  componentDidMount() {
    document.title = "RegOpz Dashboard | Manage Users";
  }

  render() {
      return(
          <div>
            <Breadcrumbs
              routes={this.props.routes}
              params={this.props.params}
              wrapperClass="breadcrumb"
            />
            { this.renderUsers() }
          </div>
      );
  }

  renderUsers() {
      this.dataSource = this.props.userDetails;

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
          <div className="row form-container">
            {
                ((dataSource) => {
                    let user_list = [];
                    dataSource.map((item, index) => {
                        console.log(index, "From ManageUsers", item);
                        user_list.push(
                            <div key={index} className="col-md-4 col-sm-4 col-xs-12">
                              <div className="x_panel_overflow x_panel tile fixed_height_320">
                                <div className="x_title">
                                    <h2>{ item.name }
                                      <small>User Details</small>
                                    </h2>
                                  <ul className="nav navbar-right panel_toolbox">
                                    <li>
                                      <Link key={item.username} to={`/dashboard/manage-users/edit-user?user=${item.username}`}>
                                        <i className="fa fa-wrench" rel="tooltip" title="Edit User"></i>
                                      </Link>
                                    </li>
                                  </ul>
                                  <div className="clearfix"></div>
                                </div>
                                <div className="x_content">
                                  <div className="dashboard-widget-content">
                                    <ul className="to_do">
                                        {
                                            item.info.map((obj, index) => {
                                                return(
                                                    <li key={index}>
                                                        <h4><i className="fa fa-support"></i> <Label bsStyle="primary">{obj.title}</Label></h4>
                                                        <div>{ obj.value }</div>
                                                    </li>
                                                );
                                            })
                                        }
                                    </ul>
                                  </div>
                                </div>
                              </div>
                            </div>
                        );
                    });
                    return(user_list);
                })(this.dataSource)
            }
          </div>
      );
  }
}

function mapStateToProps(state) {
  console.log("On map state of Manage Users:", state);
  return {
    userDetails: state.user_details.data
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchUsers: () => {
      dispatch(actionFetchUsers());
    }
  };
};

const VisibleManageUsers = connect(
  mapStateToProps,
  mapDispatchToProps
)(ManageUsersComponent);

export default VisibleManageUsers;
