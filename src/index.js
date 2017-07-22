import React, { Component } from 'react';
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

import Dashboard from './components/Dashboard/Dashboard';
import CaptureReportTemplate from './components/CaptureReportTemplate/CaptureReportTemplate';
import DashboardIndex from './components/Dashboard/DashBoardIndex';
import MaintainBusinessRules from './components/MaintainBusinessRules/MaintainBusinessRules';
import AddBusinessRule from './components/MaintainBusinessRules/AddBusinessRule/AddBusinessRule';
import custom from '../js/custom';
import RegOpzDataGrid from './components/RegOpzDataGrid/RegOpzDataGrid';
import ViewDataComponentV2 from './components/ViewData/ViewDataComponentV2';
import ViewDataComponent from './components/ViewData/ViewDataComponent';
import ViewReport from './components/ViewReport/ViewReport';
import DrillDown from './components/DrillDown/DrillDown';
import MaintainReportRules from './components/MaintainReportRules/MaintainReportRules';
import AddReportRules from './components/MaintainReportRules/AddReportRules/AddReportRules';
import AddReportAggRules from './components/MaintainReportRules/AddReportAggRules';
import MaintainSources from './components/MaintainSources/MaintainSources';
import AddSources from './components/MaintainSources/AddSources/AddSources';
import VarianceAnalysisForm from './components/VarianceAnalysis/VarianceAnalysis';
import VarianceAnalysisGrid from './components/VarianceAnalysis/VarianceAnalysisGrid';
import VarianceAnalysisChart from './components/VarianceAnalysis/VarianceAnalysisChart';
import CreateReport from './components/CreateReport/CreateReport';
import ManageDefChange from './components/ManageDefChange/ManageDefChange';
import ManageRoles from './components/ManageRoles/ManageRoles';
import AddRoles from './components/ManageRoles/AddRoles/AddRoles';
import ManageUsers from './components/ManageUsers/ManageUsers';

const createStoreWithMiddleware = applyMiddleware(promiseMiddleware)(createStore);
const store = createStoreWithMiddleware(reducers);

if (localStorage.RegOpzToken) {
    let webToken = localStorage.RegOpzToken;
    store.dispatch(actionRelogin(webToken));
}

class Index extends Component {
    render() {
        console.log('Render Function Called........');
        console.log(this.props);
        if (!this.props.user){
            return (<Login {...this.props} />);
        }
        else if(this.props.children){
          return (<div> {this.props.children} </div>);
        } else {
          hashHistory.push('/dashboard');
          return(<Dashboard {...this.props} />);
        }

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
        user: state.login_store.user,
        name: state.login_store.name,
        role: state.login_store.role,
        permission: state.login_store.permission
    };
}

const VisibleIndex = connect(
    mapStateToProps
)(Index);

ReactDOM.render(
    <Provider store={store}>
        <Router history={hashHistory}>
            <Route path="/" component={VisibleIndex} />
            <Route path="/" component={VisibleIndex}>
                <Route path="dashboard" component={Dashboard} >
                    <IndexRoute component={DashboardIndex} />
                    <Route path="capture-report-template" component={CaptureReportTemplate} />
                    <Route path="data-grid" component={RegOpzDataGrid} />
                    <Route path="maintain-business-rules" component={MaintainBusinessRules} />
                    <Route path="maintain-business-rules/add-business-rule" component={AddBusinessRule} />
                    <Route path="view-data" component={ViewDataComponentV2} />
                    <Route path="view-data-on-grid" component={ViewDataComponent} />
                    <Route path="view-report" component={ViewReport} />
                    <Route path="create-report" component={CreateReport} />
                    <Route path="drill-down" component={DrillDown} />
                    <Route path="maintain-report-rules" component={MaintainReportRules} />
                    <Route path="maintain-report-rules/add-report-rules" component={AddReportRules} />
                    <Route path="maintain-report-rules/add-report-agg-rules" component={AddReportAggRules} />
                    <Route path="maintain-sources" component={MaintainSources} />
                    <Route path="maintain-sources/add-sources" component={AddSources} />
                    <Route path="variance-analysis" component={VarianceAnalysisForm} />
                    <Route path="variance-analysis/variance-data-grid" component={VarianceAnalysisGrid} />
                    <Route path="variance-analysis/variance-chart" component={VarianceAnalysisChart} />
                    <Route path="workflow/manage-def-change" component={ManageDefChange} />
                    <Route path="manage-roles" component={ManageRoles} />
                    <Route path="manage-roles/add-roles" component={AddRoles} />
                    <Route path="manage-users" component={ManageUsers} />
                </Route>
            </Route>
        </Router>
    </Provider>
    , document.querySelector(".react_container"));
