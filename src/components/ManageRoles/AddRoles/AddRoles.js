import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { hashHistory } from 'react-router';
import { connect } from 'react-redux';
import { bindActionCreators, dispatch } from 'redux';
import {
    actionFetchOneRole,
    actionFetchComponents,
    actionFetchPermissions,
    actionUpdateRoles
} from '../../../actions/RolesAction';
import InfoModal from '../../InfoModal/InfoModal';
import ModalAlert from '../../ModalAlert/ModalAlert';
require('./AddRoles.css');

class AddRolesComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            role: this.props.location.query['role'],
            permissions: {},
            selectedComponent: null
        };
        this.componentList = null;
        this.permissionList = null;
        this.isDefaultChecked = this.isDefaultChecked.bind(this);
        this.onTextChange = this.onTextChange.bind(this);
        this.onComponentSelect = this.onComponentSelect.bind(this);
        this.onPermissionSelect = this.onPermissionSelect.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentWillMount() {
        if (this.state.role != null) {
            this.props.fetchOne(this.state.role);
        }
        this.props.fetchComponents();
        this.props.fetchPermissions();
        this.propsToSource(this.props.form);
    }

    componentDidMount() {
        this.propsToSource(this.props.form);
    }

    propsToSource(data) {
        if (typeof data != 'undefined') {
            var permissionList = {};
            data.forEach((item) => {
                let component = item.component;
                let permission = item.permission;
                if (typeof permissionList[component] == 'undefined') {
                    permissionList[component] = {};
                }
                permissionList[component][permission] = true;
            })
            this.setState({ permissions: permissionList });
        }
    }

    render() {
        this.componentList = this.props.components;
        this.permissionList = this.props.permissions;
        console.log("Add Roles:", this.state);

        return(
            <div className="row">
                <div className="col col-lg-12">
                    <div className="x_title">
                        <h2>Role Management <small>Add a new role</small></h2>
                        <div className="clearfix"></div>
                    </div>
                    <div className="x_content">
                        <form className="form-horizontal form-label-left" onSubmit={ this.handleSubmit }>
                            <div className="form-group">
                              <label className="control-label col-md-3 col-sm-3 col-xs-12" htmlFor="role-title">Role <span className="required">*</span></label>
                              <div className="col-md-6 col-sm-6 col-xs-12">
                                <input
                                  name="role"
                                  placeholder="Title"
                                  value={ this.state.role }
                                  type="text"
                                  id="role-title"
                                  className="form-control col-md-7 col-xs-12"
                                  onChange={ this.onTextChange }
                                />
                              </div>
                            </div>
                            <div className="form-group">
                              <div className="col-md-6 col-sm-6 col-xs-12 component-list">
                                  { this.renderComponents() }
                              </div>
                              <div className="col-md-6 col-sm-6 col-xs-12">
                                  { this.renderPermissions() }
                              </div>
                            </div>
                            <div className="form-group">
                              <div className="col-md-9 col-sm-9 col-xs-12 col-md-offset-3">
                                <button type="button"
                                className="btn btn-primary"
                                onClick={this.handleCancel}>
                                  Cancel
                                </button>
                                <button type="submit" className="btn btn-success">Submit</button>
                              </div>
                            </div>
                        </form>
                        <div className="clearfix"></div>
                    </div>
                    <InfoModal
                    showDiscard={true}
                    title={this.state.role}
                    body={this.props.message}
                    onClickDiscard={(e) => { this.handleCancel(e) }}/>
                </div>
            </div>
        );
    }

    renderComponents() {
        if (this.componentList != null) {
            return(
                <ul className="list-group">
                {
                    this.componentList.map((item, index) => {
                        return(
                            <li
                            className="list-group-item component-list-item"
                            key={ index }>
                                <button type="button"
                                name={ item.component }
                                className="btn btn-default component-btn"
                                onClick={ this.onComponentSelect }>
                                    { item.component }
                                </button>
                            </li>
                        );
                    })
                }
                </ul>
            );
        } else {
            return (
                <h2>No component available!</h2>
            );
        }
    }

    renderPermissions() {
        if (this.permissionList != null && this.state.selectedComponent != null) {
            return(
                <ul className="list-group">
                <li
                className="list-group-item">
                    { this.state.selectedComponent }
                </li>
                {
                    this.permissionList.map((item, index) => {
                        return(
                            <li
                            className="list-group-item component-list-item"
                            key={ index }>
                                <div className="input-group permission-box">
                                  <span className="input-group-addon">
                                    <input
                                    type="checkbox"
                                    id={ item.permission }
                                    name={ item.permission }
                                    value=""
                                    onChange={ this.onPermissionSelect }
                                    defaultChecked={ false }/>
                                  </span>
                                  <input type="text" className="form-control" value={ item.permission } readOnly/>
                                </div>
                            </li>
                        );
                    })
                }
                </ul>
            );
        } else {
            return (
                <h2>No component selected!</h2>
            );
        }
    }

    isDefaultChecked(item) {
        if (this.state.permissions != null) {
            var selectedComponent = this.state.permissions[this.state.selectedComponent];
            if (selectedComponent) {
                return selectedComponent[item.permission];
            }
        }
        return false;
    }

    onTextChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    onComponentSelect(e) {
        this.setState({ selectedComponent: e.target.name });
    }

    onPermissionSelect(e) {
        let newState = this.state;
        let selectedComponent = newState.selectedComponent;
        let component = newState.permissions[selectedComponent];
        if (typeof component != 'undefined' && component != null) {
            component[e.target.name] = !component[e.target.name];
        } else {
            newState.permissions[selectedComponent] = {};
            newState.permissions[selectedComponent][e.target.name] = true;
        }
        this.setState(newState);
    }

    handleCancel(e) {
        const encodedUrl = encodeURI('/dashboard/manage-roles');
        hashHistory.push(encodedUrl);
    }

    handleSubmit(e) {
        e.preventDefault();
        const role = this.state.role;
        const form = JSON.parse(JSON.stringify(this.state.permissions));
        var permissions = [];
        if (!(Object.keys(form).length === 0 && form. constructor === Object)) {
            for (var component in form) {
                for (var permission in form[component]) {
                    if (form[component][permission] === true) {
                        var object = {
                            'component': component,
                            'permission': permission
                        };
                        permissions.push(object);
                    }
                }
            }
            this.props.submitForm({ role: role, permissions: permissions });
        }
    }
}

function mapStateToProps(state) {
    return {
        form: state.role_management.form,
        components: state.role_management.components,
        permissions: state.role_management.permissions,
        message: state.role_management.message
    };
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchOne: (role) => {
        dispatch(actionFetchOneRole(role));
    },
    fetchComponents: () => {
        dispatch(actionFetchComponents());
    },
    fetchPermissions: () => {
        dispatch(actionFetchPermissions());
    },
    submitForm: (data) => {
        dispatch(actionUpdateRoles(data));
    }
  };
};

const VisibleAddRoles = connect(
    mapStateToProps,
    mapDispatchToProps
)(AddRolesComponent);

export default VisibleAddRoles;
