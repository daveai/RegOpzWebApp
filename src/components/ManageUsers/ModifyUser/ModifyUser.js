import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { hashHistory, Link } from 'react-router';
import { connect } from 'react-redux';
import { bindActionCreators, dispatch } from 'redux';
import { Field, reduxForm, formValueSelector } from 'redux-form';
import { Label, Button, Modal, Checkbox } from 'react-bootstrap';
import Breadcrumbs from 'react-breadcrumbs';
import {
    actionFetchUsers,
    actionUpdateUser,
    actionDeleteUser
} from '../../../actions/UsersAction';
import {
    actionFetchRoles
} from '../../../actions/RolesAction';
require('./ModifyUser.css');

const selector = formValueSelector('edit-user');

const renderField = ({ input, label, type, readOnly, meta: { touched, error }}) => (
    <div className="form-group">
        <label className="control-label col-md-3 col-sm-3 col-xs-12" htmlFor={label}>
            {label}
            <span className="required">*</span>
        </label>
        <div className="col-md-9 col-sm-9 col-xs-12">
            <input {...input}
              placeholder={label}
              type={type}
              id={label}
              readOnly={ readOnly }
              className="form-control col-md-4 col-xs-12"/>
            {
                touched &&
                ((error &&
                <div className="alert alert-danger">
                    { error }
                </div>))
            }
        </div>
    </div>
);

const renderSelect = ({ input, label, options, defaultOption, meta: { touched, error }}) => (
    <div className="form-group">
        <label className="control-label col-md-3 col-sm-3 col-xs-12" htmlFor={label}>
            {label}
            <span className="required">*</span>
        </label>
        <div className="col-md-9 col-sm-9 col-xs-12">
            <select {...input}
              id={label}
              defaultValue={ defaultOption }
              className="form-control col-md-4 col-xs-12">
            {
                ((options) => {
                    let optionList = [];
                    options.map((item, index) => {
                        optionList.push(
                            <option key={index} value={item.role}>
                                { item.role }
                            </option>
                        );
                    });
                    return optionList;
                })(options)
            }
            </select>
            {
                touched &&
                ((error &&
                <div className="alert alert-danger">
                    { error }
                </div>))
            }
        </div>
    </div>
);

const normaliseContactNumber = value => value && value.replace(/[^\d]/g, '');

const validate = (values) => {
    const errors = {};
    console.log("Inside validate", values);

    Object.keys(values).forEach((item, index) => {
        if (!values[item]) {
            errors[item] = `${item} cannot be empty.`;
        }
    });

    if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.Email)) {
        errors.Email = "Invalid email address.";
    }

    if (isNaN(Number(values["Contact Number"]))) {
        errors["Contact Number"] = "Must be a number.";
    }

    console.log("End of validate", errors);
    return errors;
}

class ModifyUser extends Component {
    constructor(props) {
        super(props);
        this.userIndex = this.props.location.query['userId'];
        this.dataSource = null;
        this.initialValues = {};
        this.userStatus = "Delete";
        this.buttonDeleteActivateClass = "btn btn-danger";
        this.handleCancel = this.handleCancel.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.handleFormSubmit = this.handleFormSubmit.bind(this);
        this.refreshValues = false;
    }

    componentWillMount() {
        console.log("Inside componentWillMount", this.initialValues,this.initialiseCount)
        if (typeof this.userIndex !== 'undefined' && this.userIndex != null) {
            this.props.fetchUser(this.userIndex);
            this.props.fetchRoles();
        } else {
            hashHistory.push(encodeURI('/dashboard'));
        }
    }

    componentWillUpdate() {
      console.log("Inside componentWillUpdate", this.initialValues,this.initialiseCount)
      if (this.refreshValues) {
        this.props.initialize(this.initialValues);
        this.refreshValues = ! this.refreshValues;
      }
    }


    componentDidMount(){
      console.log("Inside componentDidMount", this.initialValues)
      this.props.initialize(this.initialValues);
      document.title = "RegOpz Dashboard | Edit User";
    }

    render() {
        if (typeof this.props.userDetails !== 'undefined' && this.props.userDetails != null) {
            this.dataSource = this.props.userDetails[0];
        }
        console.log("Inside Modify User Render:", this.dataSource);
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
        const { handleSubmit, pristine, dirty, submitting, roleList, selectedRole } = this.props;
        if (this.dataSource == null) {
            return(<h1>Loading...</h1>);
        } else if (typeof this.dataSource == 'undefined') {
            return (<h1>Data not found...</h1>);
        }
        return(
            <div className="row form-container">
                <div className="col col-lg-12">
                    <div className="x_title">
                        <h2>User Management <small>Edit a User Permissions</small></h2>
                        <div className="clearfix"></div>
                    </div>
                    <div className="x_content">
                        <form className="form-horizontal form-label-left" onSubmit={ handleSubmit(this.handleFormSubmit) }>
                            { this.renderFields(this.dataSource.info, roleList) }
                            <div className="col-md-9 col-sm-9 col-xs-12 col-md-offset-3">
                                {
                                    ((roleList, selectedRole) => {
                                        if (roleList && selectedRole) {
                                            let permission = roleList.find((item, index) => item.role == selectedRole);
                                            return this.renderPermissions(permission);
                                        } else {
                                            return(<h2>No role provided...</h2>);
                                        }
                                    })(roleList, selectedRole)
                                }
                            </div>
                            <div className="clearfix"></div>
                            <div className="form-group">
                              <div className="col-md-9 col-sm-9 col-xs-12 col-md-offset-3">
                                <button type="button" className="btn btn-primary" onClick={ this.handleCancel } disabled={ submitting }>
                                    Cancel
                                </button>
                                <button type="submit" className="btn btn-success" disabled={ pristine || submitting }>
                                    Submit
                                </button>
                                <button type="button" className={ this.buttonDeleteActivateClass } onClick={ this.handleDelete } disabled={ dirty || submitting }>
                                    { this.userStatus }
                                </button>
                              </div>
                           </div>
                        </form>
                        <div className="clearfix"></div>
                    </div>
                </div>
            </div>
        );
    }

    renderFields(inputList, roleList) {
        let fieldArray = [];
        let localValues = {};
        inputList.map((item, index) => {
            if (item.title == "Status") {
                if (item.value != "Active") {
                  this.userStatus = "Activate";
                  this.buttonDeleteActivateClass = "btn btn-warning";
                } else {
                  this.userStatus = "Delete";
                  this.buttonDeleteActivateClass = "btn btn-danger";
                }
            }
            fieldArray.push(
                item.title == "Role" ?
                this.renderSelectOption(roleList, item.value) :
                <Field
                  key={index}
                  name={ item.title }
                  type="text"
                  component={renderField}
                  label={ item.title }
                  normalize={ item.title == "Contact Number" ? normaliseContactNumber : null}
                  readOnly={ item.title == "Status" || item.title == "User Name" }
                />
            );
            localValues[item.title] = item.value;
        });
        if (localValues["User Name"] !== this.initialValues["User Name"]) {
            this.refreshValues = true;
        }
        this.initialValues = localValues;
        return fieldArray;
    }

    renderSelectOption(roleList, defaultRole) {
        if (typeof roleList === 'undefined' || roleList == null) {
            return(
                <Field
                  key="role"
                  name="Role"
                  type="text"
                  component={renderField}
                  label="Role"
                  readOnly={ true }
                />
            );
        }
        return(
            <Field
              key="role"
              name="Role"
              type="text"
              label="Role"
              component={renderSelect}
              options={roleList}
              defaultOption={defaultRole}
            />
        );
    }

    renderPermissions(item) {
        if (typeof item !== 'undefined' && item != null) {
            return(
                <div className="x_panel_overflow x_panel tile fixed_height_320">
                  <div className="x_title role_label">
                      <h2>{ item.role }
                        <small>Role Details</small>
                      </h2>
                    <ul className="nav navbar-right panel_toolbox">
                      <li>
                        <Link key={item.id} to={`/dashboard/manage-roles/add-roles?role=${item.role}`}>
                          <i className="fa fa-wrench" rel="tooltip" title="Edit Role"></i>
                        </Link>
                      </li>
                    </ul>
                    <div className="clearfix"></div>
                  </div>
                  <div className="x_content">
                    <div className="dashboard-widget-content">
                      <ul className="to_do">
                        {
                          item.components.map((comp, index) => {
                            return(
                              <li key={index}>
                                <h4><i className="fa fa-support"></i> <Label bsStyle="primary">{comp.component}</Label></h4>
                                  {
                                    comp.permissions.map((perm, index) => {
                                      let defaultChecked = null;
                                      let permDisabled = null;
                                      if (perm.permission_id) {
                                        defaultChecked = "checked";
                                        permDisabled ="checked"
                                      }
                                      return(
                                          <div>
                                            <input
                                              key={index}
                                              type="checkbox"
                                              defaultChecked={defaultChecked}
                                              disabled={true}/>
                                          <span className="perm_label">
                                            { perm.permission }
                                          </span>
                                        </div>
                                      );
                                    })
                                  }
                              </li>
                            );
                          })
                        }
                      </ul>
                    </div>
                  </div>
                </div>
            );
        }
    }

    handleFormSubmit(data) {
        console.log('User Details Submitted!', data);
        this.props.submitUser(data);
        this.handleCancel();
    }

    handleCancel(event) {
        hashHistory.push(encodeURI('/dashboard/manage-users'));
    }

    handleDelete(event) {
        if ( this.userStatus == "Activate"){
          console.log("Inside activate user");
        } else {
          console.log("Inside delete user");
          this.props.deleteUser(this.userIndex);
        }
        this.handleCancel();
    }
}

function mapStateToProps(state) {
    console.log("On map state of Manage Users:", state);
    return {
        userDetails: state.user_details.error,
        roleList: state.role_management.data,
        selectedRole: selector(state, 'Role')
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        fetchUser: (data) => {
            dispatch(actionFetchUsers(data));
        },
        fetchRoles: () => {
            dispatch(actionFetchRoles());
        },
        submitUser: (data) => {
            dispatch(actionUpdateUser(data));
        },
        deleteUser: (data) => {
            dispatch(actionDeleteUser(data));
        }
    };
};

const VisibleModifyUser = connect(
    mapStateToProps,
    mapDispatchToProps
)(ModifyUser);

export default reduxForm({
    form: 'edit-user',
    validate
})(VisibleModifyUser);
