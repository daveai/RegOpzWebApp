import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { hashHistory } from 'react-router';
import { connect } from 'react-redux';
import { bindActionCreators, dispatch } from 'redux';
import {
    actionFetchOneRole,
    actionFetchComponents,
    actionFetchPermissions,
    actionUpdateRoles,
    actionDeleteRoles
} from '../../../actions/RolesAction';
import InfoModal from '../../InfoModal/InfoModal';
import ModalAlert from '../../ModalAlert/ModalAlert';
require('./AddRoles.css');

class AddRolesComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            role: this.props.location.query['role'],
            permissions: null,
            selectedComponent: null
        };
        this.dataSource = null;
        this.formData = [];
        this.componentList = null;
        this.permissionList = null;
        this.infoModal = null;
        this.modalAlert = null;
        this.buttonClicked = null;
        this.isDefaultChecked = this.isDefaultChecked.bind(this);
        this.savePrevious = this.savePrevious.bind(this);
        this.onTextChange = this.onTextChange.bind(this);
        this.onComponentSelect = this.onComponentSelect.bind(this);
        this.onPermissionSelect = this.onPermissionSelect.bind(this);
        this.goPreviousPage = this.goPreviousPage.bind(this);
        this.onClickOkay = this.onClickOkay.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.formSubmit = this.formSubmit.bind(this);
    }

    componentWillMount() {
        if (this.state.role != null) {
            this.props.fetchOne(this.state.role);
        }
        this.props.fetchComponents();
        this.props.fetchPermissions();
    }

    componentDidMount() {
      document.title = "RegOpz Dashboard | Add Role";
    }

    render() {
        if (this.props.location.query['role']) {
            this.dataSource = this.props.form
        }
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
                                <button type="submit"
                                className="btn btn-success"
                                disabled={ !this.state.role }>
                                  Submit
                                </button>
                                <button type="button"
                                className="btn btn-danger"
                                disabled={ !this.props.location.query['role'] }
                                onClick={this.handleDelete}>
                                  Delete
                                </button>
                              </div>
                            </div>
                        </form>
                        <div className="clearfix"></div>
                    </div>
                    <InfoModal
                    title={ this.state.role }
                    ref={ (infoModal) => { this.infoModal = infoModal }}
                    onClickOkay={ this.goPreviousPage }/>
                    <ModalAlert
                    showDiscard={ true }
                    ref={ (modalAlert) => { this.modalAlert = modalAlert }}
                    onClickOkay= { this.onClickOkay }/>
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
                                    checked={ this.isDefaultChecked(item.permission) }/>
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

    isDefaultChecked(permission) {
        console.log("Checking for:", permission);
        console.log("Selected Component:", this.state.selectedComponent);
        if (this.state.permissions != null) {
            let selectedPermission = this.state.permissions.filter(
                (item) => {
                    return item.permission == permission;
                }
            );
            return selectedPermission.length != 0 && selectedPermission[0].permission_id;
        }
        return false;
    }

    savePrevious() {
        if (this.state.selectedComponent != null && this.state.permissions != null) {
            let selectedComponent = this.state.selectedComponent;
            let permissions = this.state.permissions;
            let pushObj = {
                'component': selectedComponent,
                'permissions': permissions
            };
            if (this.dataSource == null) {
                this.dataSource = { 'components': [ pushObj ]};
            } else {
                let selectedPermissionsIndex = this.dataSource.components.findIndex(
                    (item) => {
                        return item.component == selectedComponent;
                    }
                );
                if (selectedPermissionsIndex == -1) {
                    this.dataSource.components.push(pushObj);
                } else {
                    this.dataSource.components[selectedPermissionsIndex].permissions = permissions;
                }
            }
        }
    }

    onTextChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    onComponentSelect(e) {
        this.savePrevious();
        let selectedComponent = e.target.name;
        let permissions = null;
        if (this.dataSource != null) {
            let selectedPermissions = this.dataSource.components.filter(
                (item) => {
                    return item.component == selectedComponent;
                }
            );
            permissions = selectedPermissions.length != 0 && selectedPermissions[0].permissions;
        }
        this.setState({ selectedComponent: selectedComponent, permissions: permissions });
    }

    onPermissionSelect(e) {
        let targetName = e.target.name;
        let permissionObj = {
            'permission': targetName,
            'permission_id': 1
        }
        console.log("Clicked:", targetName, "on component", this.state.selectedComponent);
        if (this.state.permissions == null) {
            this.setState({ permissions: [ permissionObj ] });
        } else {
            let permissions = this.state.permissions;
            let permissionIndex = permissions.findIndex(
                (item) => {
                    return item.permission == targetName;
                }
            );
            if (permissionIndex == -1) {
                permissions.push(permissionObj);
            } else {
                permissions[permissionIndex].permission_id = permissions[permissionIndex].permission_id ? null : 1;
            }
            this.setState({ permissions: permissions });
        }
    }

    goPreviousPage() {
        const encodedUrl = encodeURI('/dashboard/manage-roles');
        hashHistory.push(encodedUrl);
    }

    onClickOkay(e) {
        /*if (this.buttonClicked == 'Cancel') {
            this.goPreviousPage();
        } else */if (this.buttonClicked == 'Delete') {
            this.props.deleteRow(this.state.role);
            console.log(this.props.message);
            // this.infoModal.open(this.props.message);
        } else if (this.buttonClicked == 'Submit') {
            this.formSubmit();
            console.log(this.props.message);
            // this.infoModal.open(this.props.message);
        }
        this.goPreviousPage();
    }

    handleCancel(e) {
        this.buttonClicked = "Cancel";
        this.modalAlert.open("Are you sure to cancel all the changes?");
    }

    handleDelete(e) {
        this.buttonClicked = "Delete";
        this.modalAlert.open("Are you sure to delete this role?");
    }

    handleSubmit(e) {
        e.preventDefault();
        this.buttonClicked = "Submit";
        this.modalAlert.open("Are you sure to submit this role?");
    }

    formSubmit() {
        if (this.dataSource != null) {
            console.log("Submiting form data:", this.dataSource);
            this.props.submitForm(this.dataSource)
        } else {
            console.log("Nothing to commit, no data found!");
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
    deleteRow: (role) => {
        dispatch(actionDeleteRoles(role));
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
