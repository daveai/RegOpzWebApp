import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { hashHistory, Link } from 'react-router';
import { connect } from 'react-redux';
import { bindActionCreators, dispatch } from 'redux';
import { Field, reduxForm } from 'redux-form';
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

const renderSelect = ({ input, label, options, defaultRole, meta: { touched, error }}) => (
    <div className="form-group">
        <label className="control-label col-md-3 col-sm-3 col-xs-12" htmlFor={label}>
            {label}
            <span className="required">*</span>
        </label>
        <div className="col-md-9 col-sm-9 col-xs-12">
            <select {...input}
              id={label}
              className="form-control col-md-4 col-xs-12">
            {
                ((options, defaultRole) => {
                    let optionList = [];
                    options.map((item, index) => {
                        optionList.push(
                            <option key={index} value={item.role} selected={ item.role == defaultRole }>
                                { item.role }
                            </option>
                        );
                    });
                    return optionList;
                })(options, defaultRole)
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

const validate = (values) => {
    const errors = {};
    console.log("Inside validate", values);
/*
    Object.keys(values).forEach((item, index) => {
        console.log(item, values[item]);
        if (!values[item]) {
            errors[item] = `${item} cannot be empty.`;
        }
    });
*/
    errors.Role = "Invalid";
    return errors;
}

class ModifyUser extends Component {
    constructor(props) {
        super(props);
        this.userIndex = this.props.location.query['userId'];
        this.dataSource = null;
        this.initialValues = {};
        this.userStatus = "Delete";
        this.handleCancel = this.handleCancel.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.handleFormSubmit = this.handleFormSubmit.bind(this);
    }

    componentWillMount() {
        if (typeof this.userIndex !== 'undefined' && this.userIndex != null) {
            this.props.fetchUser(this.userIndex);
            this.props.fetchRoles();
        } else {
            hashHistory.push(encodeURI('/dashboard'));
        }
    }

    componentDidMount(){
      console.log("Inside componentWillUpdate", this.initialValues)
      this.props.initialize(this.initialValues);
      document.title = "RegOpz Dashboard | Edit User";
    }

    render() {
        if (typeof this.props.userDetails !== 'undefined' && this.props.userDetails != null) {
            this.dataSource = this.props.userDetails[0];
        }
        console.log("Inside Modify User Render:", this.state, this.dataSource);
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
        const { handleSubmit, pristine, dirty, submitting } = this.props;
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
                            { this.renderFields(this.dataSource.info) }
                            <div className="form-group">
                              <div className="col-md-9 col-sm-9 col-xs-12 col-md-offset-3">
                                <button type="button" className="btn btn-default" onClick={ this.handleCancel } disabled={ submitting }>
                                    Cancel
                                </button>
                                <button type="submit" className="btn btn-success" disabled={ pristine || submitting }>
                                    Submit
                                </button>
                                <button type="button" className="btn btn-danger" onClick={ this.handleDelete } disabled={ dirty || submitting }>
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

    renderFields(inputList) {
        let fieldArray = [];
        this.initialValues = {};
        inputList.map((item, index) => {
            console.log("Inside renderFields", index, item);
            if (item.title == "Status" && item.value != "Active") {
                this.userStatus = "Activate";
            }
            fieldArray.push(
                item.title == "Role" ?
                this.renderSelectOption(item.value) :
                <Field
                  key={index}
                  name={ item.title }
                  type="text"
                  component={renderField}
                  label={ item.title }
                  readOnly={ item.title == "Status" }
                />
            );
            this.initialValues[`${item.title}`] = item.value;
        });
        return fieldArray;
    }

    renderSelectOption(defaultRole) {
        let roleList = this.props.roleList;
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
              defaultRole={defaultRole}
            />
        );
    }

    handleFormSubmit(data) {
        console.log('User Details Submitted!', data);
        this.props.submitUser(data);
    }

    handleCancel(event) {
        hashHistory.push(encodeURI('/dashboard/manage-users'));
    }

    handleDelete(event) {
        this.props.deleteUser(this.userIndex);
        this.handleCancel();
    }
}

function mapStateToProps(state) {
    console.log("On map state of Manage Users:", state);
    return {
        userDetails: state.user_details.error,
        roleList: state.role_management.data
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
