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

const renderField = ({ input, label, id, defaultValue, type, meta: { touched, error }}) => (
    <div className="form-group">
        <label className="control-label col-md-3 col-sm-3 col-xs-12" htmlFor={id}>
            {label}
            <span className="required">*</span>
        </label>
        <div className="col-md-9 col-sm-9 col-xs-12">
            <input {...input}
              placeholder={label}
              defaultValue={defaultValue}
              type={type}
              id={id}
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
        this.state = {
            form: {
                first_name: null,
                last_name: null,
                email: null
            }
        }
        this.userIndex = this.props.location.query['userId'];
        this.dataSource = null;
        this.renderForm = this.renderForm.bind(this);
        this.renderFields = this.renderFields.bind(this);
        this.onTextChange = this.onTextChange.bind(this);
        this.handleFormSubmit = this.handleFormSubmit.bind(this);
    }

    componentWillMount() {
        if (typeof this.userIndex !== 'undefined' && this.userIndex != null) {
            this.props.fetchUser(this.userIndex);
        } else {
            hashHistory.push('/dashboard');
        }
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
        //const { handleSubmit, pristine, reset, submitting, message } = this.props;
        if (this.dataSource == null) {
            return(<h1>Loading...</h1>);
        } else if (typeof this.dataSource == 'undefined') {
            return (<h1>Data not found...</h1>);
        }
        //{ this.renderFields(this.dataSource.info) }
        return(
            <div className="row form-container">
                <div className="col col-lg-12">
                    <div className="x_title">
                        <h2>User Management <small>Edit a User Permissions</small></h2>
                        <div className="clearfix"></div>
                    </div>
                    <div className="x_content">
                        <form className="form-horizontal form-label-left" onSubmit={ this.handleFormSubmit }>
                            <div className="form-group">
                                <label className="control-label col-md-3 col-sm-3 col-xs-12" htmlFor="first_name">
                                    First Name
                                    <span className="required">*</span>
                                </label>
                                <div className="col-md-9 col-sm-9 col-xs-12">
                                    <input
                                      name="first_name"
                                      type="text"
                                      label="First Name"
                                      value={ this.state.form.first_name }
                                      defaultValue={ this.filterSource(this.dataSource.info, "First Name") }
                                      onChange={ this.onTextChange }
                                      id="first_name"
                                      className="form-control col-md-4 col-xs-12"
                                    />
                                </div>
                            </div>
                            <div className="form-group">
                                <label className="control-label col-md-3 col-sm-3 col-xs-12" htmlFor="last_name">
                                    Last Name
                                    <span className="required">*</span>
                                </label>
                                <div className="col-md-9 col-sm-9 col-xs-12">
                                    <input
                                      name="last_name"
                                      type="text"
                                      label="Last Name"
                                      value={ this.state.form.last_name }
                                      defaultValue={ this.filterSource(this.dataSource.info, "Last Name") }
                                      onChange={ this.onTextChange }
                                      id="last_name"
                                      className="form-control col-md-4 col-xs-12"
                                    />
                                </div>
                            </div>
                            <div className="form-group">
                                <label className="control-label col-md-3 col-sm-3 col-xs-12" htmlFor="email">
                                    Email
                                    <span className="required">*</span>
                                </label>
                                <div className="col-md-9 col-sm-9 col-xs-12">
                                    <input
                                      name="email"
                                      type="text"
                                      label="Email"
                                      value={ this.state.form.email }
                                      defaultValue={ this.filterSource(this.dataSource.info, "Email") }
                                      onChange={ this.onTextChange }
                                      id="email"
                                      className="form-control col-md-4 col-xs-12"
                                    />
                                </div>
                            </div>
                            <div className="form-group">
                              <div className="col-md-9 col-sm-9 col-xs-12 col-md-offset-3">
                                <button type="button" className="btn btn-default">Cancel</button>
                                <button type="submit" className="btn btn-success">Submit</button>
                                <button type="button" className="btn btn-danger">Delete</button>
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
        inputList.map((item, index) => {
            console.log("Inside renderFields", index, item);
            return(
                <Field
                  key={index}
                  name={ item.title.trim() }
                  type="text"
                  component={renderField}
                  label={ item.title }
                  id={ item.title.trim() }
                />
            );
        });
    }

    filterSource(array, label) {
        let temp = array.find((item) => item.title === label);
        return temp.value;
    }

    onTextChange(event) {
        this.setState({ form: { ...this.state.form, [event.target.name]: event.target.value }})
    }

    handleFormSubmit(data) {
        console.log('Submitted!', data);
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
    }
  };
};

const VisibleModifyUser = connect(
  mapStateToProps,
  mapDispatchToProps
)(ModifyUser);

export default VisibleModifyUser;
/*
export default reduxForm({
    form: 'edit-user'
})(VisibleModifyUser);
*/
