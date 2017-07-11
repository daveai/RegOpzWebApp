import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { bindActionCreators, dispatch } from 'redux';
import {
  actionLoginRequest,
  actionIsLoggedIn,
  LOGIN_SUCCESS
} from '../actions/LoginAction';

class LoginComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: null,
            password: null,
            isLoading: false
        };

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    render() {
        const { username, password, isLoading } = this.state;
        const { error } = this.props;
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

                                { error ? <div className="alert alert-danger">Invalid Credentials</div> : '' }

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

    componentDidMount() {
        document.body.classList.add('login');
        document.title = "RegOpz Login";
    }

    onChange(event) {
      this.setState({ [event.target.name]: event.target.value });
    }

    onSubmit(event) {
        event.preventDefault();
        this.setState({ isLoading: true });
        var data = {
          username: this.state.username,
          password: this.state.password
        };
        this.props.loginRequest(data);
        this.setState({ username: null, password: null, isLoading: false });
        window.location.replace('/#/dashboard');
    }
}

function mapStateToProps(state) {
  console.log("On map state of Login", state);
  return {
    token: state.login_store.token,
    error: state.login_store.error
    //name: state.name,
    //permission: state.permission
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    loginRequest: (data) => {
      dispatch(actionLoginRequest(data));
    }
  };
}

const VisibleLogin = connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginComponent);

export default VisibleLogin;
