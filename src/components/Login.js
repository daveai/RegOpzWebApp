import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {
    Router,
    Route,
    Link,
    IndexRoute,
    hashHistory,
    browserHistory
} from 'react-router'
class Login extends Component {
    login(e){
        e.preventDefault();
    }
    render() {
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
                                    <input type="text" className="form-control" placeholder="Username" required=""/>
                                </div>
                                <div>
                                    <input type="password" className="form-control" placeholder="Password" required=""/>
                                </div>
                                <div>
                                    <a className="btn btn-default submit" href="#/dashboard">Log in</a>
                                </div>

                                <div className="clearfix"></div>

                                <div className="separator">

                                    <div className="clearfix"></div>
                                    <br/>

                                    <div>
                                        <h1><i className="fa fa-paw"></i> RegOpz</h1>
                                    <p>©2017 All Rights Reserved. RegOpz Pvt. Ltd. India</p>
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
}
export default Login;
