import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { bindActionCreators, dispatch } from 'redux';
import {
  actionLoginRequest,
  actionIsLoggedIn
} from '../actions/LoginAction';

class LoginComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: null,
            password: null,
            errors: {},
            isLoading: false
        };

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    render() {
      if (this.props.token) {
        window.location.replace('/#/dashboard');
      } else {
        const { username, password, errors, isLoading } = this.state;
        return (
            <div>
                <a className="hiddenanchor" id="signup"></a>
                <a className="hiddenanchor" id="signin"></a>

                <div className="login_wrapper">
                    <div className="animate form login_form">
                        <section className="login_content">
                            <form>
                                <h1>RegOpz Login</h1>
                                <div>
                                    <input type="text" className="form-control" placeholder="Username" name="username" onChange={this.onChange} required=""/>
                                </div>
                                <div>
                                    <input type="password" className="form-control" placeholder="Password" name="password" onChange={this.onChange} required=""/>
                                </div>
                                <div>
                                    <button className="btn btn-default submit" onClick={this.onSubmit} disabled={!(username && password) || isLoading}>Log in</button>
                                </div>

                                <div className="clearfix"></div>

                                <div className="separator">

                                    <div className="clearfix"></div>
                                    <br/>

                                    <div>
                                        <h1><i className="fa fa-paw"></i> RegOpz</h1>
                                    <p>©2017 All Rights Reserved. RegOpz Pvt. Ltd.</p>
                                    </div>
                                </div>
                            </form>
                        </section>
                    </div>
                </div>
            </div>
        );
      }
    }

    componentDidMount() {
        document.body.classList.add('login');
        document.title = "RegOpz Login";
    }

    onChange(event) {
      this.setState({ [event.target.name]: event.target.value });
    }

    onSubmit(event) {
        // This will take Username and Password as form data
        // Send them to API as serialized array POST request
        // Get back a token as response from API
        // Set token expiry in 5 minute
        // If everything works fine, redirect to /dashboard
        // alert(JSON.parse(JSON.stringify(this.state)));
        event.preventDefault();
        this.setState({ isLoading: true });
        const { router } = this.props;
        var data = {
          username: this.state.username,
          password: this.state.password
        };
        // Add salt to Password
        this.props.loginRequest(data);
        this.setState({ username: null, password: null, errors: { error: "Authentication failed!" }, isLoading: false });
    }
}

function mapStateToProps(state){
  console.log("On map state of Login", state);
  return {
    token: state.login_store.token
    //name: state.name,
    //permission: state.permission
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    loginRequest: (data) => {
      dispatch(actionLoginRequest(data));
    },
    isLoggedIn: () => {
      dispatch(actionIsLoggedIn());
    }
  }
}

const VisibleLogin = connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginComponent);

export default VisibleLogin;
