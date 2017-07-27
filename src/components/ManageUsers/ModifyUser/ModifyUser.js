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
    actionUpdateUsers,
    actionDeleteUser
} from '../../../actions/UsersAction';

const renderField = ({ input, label, defaultValue, type, meta: { touched, error }}) => (
    <div className="form-group">
        <label className="control-label col-md-3 col-sm-3 col-xs-12" htmlFor={label}>
            {label}
            <span className="required">*</span>
        </label>
        <div className="col-md-9 col-sm-9 col-xs-12">
            <input {...input}
              placeholder={label}
              defaultValue={defaultValue}
              type={type}
              id={label}
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

class ModifyUser extends Component {
    constructor(props) {
        super(props);
        this.userIndex = this.props.location.query['userId'];
        this.dataSource = null;
        this.initialValues = {};
        this.handleCancel = this.handleCancel.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.handleFormSubmit = this.handleFormSubmit.bind(this);
    }

    componentWillMount() {
        if (typeof this.userIndex !== 'undefined' && this.userIndex != null) {
            this.props.fetchUser(this.userIndex);
        } else {
            hashHistory.push(encodeURI('/dashboard'));
        }
    }

    componentWillUpdate(){
      console.log("inside componentWillUpdate",this.initialValues)
      this.props.initialize(this.initialValues);
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
        const { handleSubmit, pristine, reset, submitting, message } = this.props;
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
                                <button type="button" className="btn btn-default" onClick={ this.handleCancel }>Cancel</button>
                                <button type="submit" className="btn btn-success">Submit</button>
                                <button type="button" className="btn btn-danger" onClick= { this.handleDelete }>Delete</button>
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
            fieldArray.push(
                <Field
                  key={index}
                  name={ item.title }
                  type="text"
                  component={renderField}
                  label={ item.title }
                  defaultValue={ item.value }
                />
            );
            this.initialValues[`${item.title}`] = item.value;
        });
        return fieldArray;
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
        userDetails: state.user_details.error
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        fetchUser: (data) => {
            dispatch(actionFetchUsers(data));
        },
        submitUser: (data) => {
            dispatch(actionUpdateUsers(data));
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
    form: 'edit-user'
})(VisibleModifyUser);
