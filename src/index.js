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

const createStoreWithMiddleware = applyMiddleware(promiseMiddleware)(createStore);
const store = createStoreWithMiddleware(reducers);

class Index extends Component {
    render() {
        if (!this.props.user)
          return (<Login {...this.props} />);
        return (<Dashboard {...this.props} />);
    }

    componentWillMount() {
      if (localStorage.RegOpzToken) {
        let webToken = localStorage.RegOpzToken;
        store.dispatch(actionRelogin(webToken));
      }
  }
}

function mapStateToProps(state) {
    return {
        user: state.login_store.user
    };
}

const VisibleIndex = connect(
    mapStateToProps
)(Index);

ReactDOM.render(
    <Provider store={store}>
        <Router history={hashHistory}>
            <Route path="/" component={VisibleIndex}/>
        </Router>
    </Provider>
, document.querySelector(".react_container"));
