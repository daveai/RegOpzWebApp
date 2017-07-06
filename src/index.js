import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {
    Router,
    Route,
    Redirect,
    Link,
    IndexRoute,
    hashHistory,
    browserHistory
} from 'react-router';
import { Provider, connect } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import promiseMiddleware from 'redux-promise';
import reducers from './reducers';
import { actionRelogin } from './actions/LoginAction';
import Login from './components/Login';
import Dashboard from './components/Home';
import setAuthorization from './utils/setAuthorization';

const createStoreWithMiddleware = applyMiddleware(promiseMiddleware)(createStore);
const store = createStoreWithMiddleware(reducers);

class Index extends Component {
    render() {
        if (!this.props.token)
          return (<Login {...this.props} />);
        return (<Dashboard {...this.props} />);
    }

    componentWillMount() {
      if (localStorage.RegOpzToken) {
        let webToken = localStorage.RegOpzToken;
        setAuthorization(webToken);
        this.relogin(webToken);
      }
  }
}

function mapStateToProps(state) {
    return {
        token: state.login_store.token
    };
}

const mapDispatchToProps = (dispatch) => {
  return {
    relogin: (data) => {
      dispatch(actionRelogin(data));
    }
  }
}

const VisibleIndex = connect(
    mapStateToProps,
    mapDispatchToProps
)(Index);

ReactDOM.render(
    <Provider store={store}>
        <Router history={hashHistory}>
            <Route path="/" component={VisibleIndex}/>
        </Router>
    </Provider>
, document.querySelector(".react_container"));
