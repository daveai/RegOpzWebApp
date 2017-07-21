import React, { Component } from 'react';
import {Field, reduxForm } from 'redux-form';

const renderField=({ input,label,type,meta: { touched, error }})=>{

  return(
      <div className="form-group">
            <label className="control-label col-md-3 col-sm-3 col-xs-12">
              {label}
            </label>
            <div className="col-md-4 col-sm-4 col-xs-12">
              <input {...input} placeholder={label} type={type} className="form-control col-md-4 col-xs-12"/>
              {touched &&
                ((error &&
                  <div className="alert alert-danger">
                    {error}
                  </div>))}
            </div>
          </div>
        );

}

const validate=values=>{
   const errors = {};
   if(!values.name){
     errors.name="User name is required";
   }else if( values.name.length < 5 || values.name.length > 20 ){
     errors.name="User name must be greater than 4 characters and less than 20 characters";
   }

   if (!values.email) {
    errors.email = 'Email address is required'
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'Invalid email address'
  }

  if(!values.first_name){
    errors.first_name="First name is required"
  }

  if(!values.last_name){
    errors.last_name="Last name is required"
  }

  if(values.password != values.passwordConfirm){
    errors.password ="Password must match"
  }


   return errors;
}

class Signup extends Component{
  constructor(props){
    super(props);
  }

  handleFormSubmit(data){
    console.log(data);
  }

  render(){
    const { handleSubmit, pristine, reset, submitting } = this.props;
    return(
      <div className="row">
        <div className="col col-lg-12">

          <div className="x_title">
            <h2>Signup <small>Add your signin detail</small></h2>
            <div className="clearfix"></div>
          </div>

          <div className="x_content">
              <form className="form-horizontal form-label-left" onSubmit={handleSubmit(this.handleFormSubmit.bind(this))} >
                      <Field
                        name="name"
                        type="text"
                        component={renderField}
                        label="Username"
                      />
                      <Field
                          name="first_name"
                          type="text"
                          component={renderField}
                          label="First name"
                        />

                        <Field
                          name="last_name"
                          type="text"
                          component={renderField}
                          label="Last name"
                        />

                        <Field
                          name="contact_number"
                          type="text"
                          component={renderField}
                          label="Contact number"
                        />

                        <Field
                          name="email"
                          type="text"
                          component={renderField}
                          label="Email"
                        />


                        <Field
                          name="password"
                          type="password"
                          component={renderField}
                          label="Password"
                        />

                        <Field
                          name="passwordConfirm"
                          type="password"
                          component={renderField}
                          label="Password Confirmation"
                        />

                        <div className="form-group">
                          <div className="col-md-9 col-sm-9 col-xs-12 col-md-offset-3">
                            <button type="button" className="btn btn-primary" onClick={reset} disabled={pristine || submitting} >Reset</button>
                            <button type="submit" className="btn btn-success" disabled={submitting}>Submit</button>
                          </div>
                        </div>
              </form>
          </div>

        </div>
      </div>
    );
  }
}


export default reduxForm(
  {form:'signup',
  validate:validate
  })(Signup);
