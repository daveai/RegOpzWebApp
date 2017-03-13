import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {
    Router,
    Route,
    Link,
    IndexRoute,
    hashHistory,
    browserHistory
} from 'react-router';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import promiseMiddleware from 'redux-promise';
import reducers from './reducers';
import Login from './components/Login';
import Dashboard from './components/Dashboard/Dashboard';
import CaptureReportTemplate from './components/CaptureReportTemplate/CaptureReportTemplate';
import DashboardIndex from './components/Dashboard/DashBoardIndex';
import DataGrid from './components/DataGrid/DataGrid';
import custom from '../js/custom';
const createStoreWithMiddleware = applyMiddleware(promiseMiddleware)(createStore);
class Index extends Component {
    render() {
        return (
            <div>
                {this.props.children}
            </div>

        );
    }
    componentDidMount() {
    }
}
const Dme2 = () => <h1>Hello World 2!</h1>
ReactDOM.render(
    <Provider store={createStoreWithMiddleware(reducers)}>
        <Router history={hashHistory}>
            <Route component={Index}>
                <Route path="/login" component={Login}/>
                <Route path="/dashboard" component={Dashboard} >
                    <IndexRoute component={DashboardIndex} />
                    <Route path="capture-report-template" component={CaptureReportTemplate} />
                    <Route path="data-grid" component={DataGrid} />
                </Route>
            </Route>
        </Router>
    </Provider>
, document.querySelector(".react_container"));
