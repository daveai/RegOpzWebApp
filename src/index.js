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
import Login from './components/Login';
import Dashboard from './components/Dashboard/Dashboard';
import CaptureReportTemplate from './components/CaptureReportTemplate/CaptureReportTemplate';
import DashboardIndex from './components/Dashboard/DashBoardIndex';
import DataGrid from './components/DataGrid/DataGrid';
import custom from '../js/custom';
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
    <Router history={hashHistory}>
    <Route component={Index}>
        <Route path="/login" component={Login}/>
        <Route path="/dashboard" component={Dashboard} >
            <IndexRoute component={DashboardIndex} />
            <Route path="capture-report-template" component={CaptureReportTemplate} />
            <Route path="data-grid" row="10" col="10" component={DataGrid} />
        </Route>
    </Route>
</Router>, document.querySelector(".react_container"));
