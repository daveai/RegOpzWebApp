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
import MaintainBusinessRules from './components/MaintainBusinessRules/MaintainBusinessRules';
import custom from '../js/custom';
import RegOpzDataGrid from './components/RegOpzDataGrid/RegOpzDataGrid';
import ViewDataComponentV2 from './components/ViewData/ViewDataComponentV2';
import ViewDataComponent from './components/ViewData/ViewDataComponent';
import ViewReport from './components/ViewReport/ViewReport';
import DrillDown from './components/DrillDown/DrillDown';
import MaintainReportRules from './components/MaintainReportRules/MaintainReportRules';
import AddReportRules from './components/MaintainReportRules/AddReportRules/AddReportRules';
import MaintainSources from './components/MaintainSources/MaintainSources';
import AddSources from './components/MaintainSources/AddSources/AddSources';
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
ReactDOM.render(
    <Provider store={createStoreWithMiddleware(reducers)}>
        <Router history={hashHistory}>
            <Route component={Index}>
                <Route path="/login" component={Login}/>
                <Route path="/dashboard" component={Dashboard} >
                    <IndexRoute component={DashboardIndex} />
                    <Route path="capture-report-template" component={CaptureReportTemplate} />
                    <Route path="data-grid" component={RegOpzDataGrid} />
                    <Route path="maintain-business-rules" component={MaintainBusinessRules} />
                    <Route path="view-data" component={ViewDataComponentV2} />
                    <Route path="view-data-on-grid" component={ViewDataComponent} />
                    <Route path="view-report" component={ViewReport} />
                    <Route path="drill-down" component={DrillDown} />
                    <Route path="maintain-report-rules" component={MaintainReportRules} />
                    <Route path="maintain-report-rules/add-report-rules" component={AddReportRules} />
                    <Route path="maintain-sources" component={MaintainSources} />
                    <Route path="maintain-sources/add-sources" component={AddSources} />
                </Route>
            </Route>
        </Router>
    </Provider>
, document.querySelector(".react_container"));
