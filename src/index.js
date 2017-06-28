import React, { Component } from 'react';
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
import VarianceAnalysisForm from './components/VarianceAnalysis/VarianceAnalysis';
import VarianceAnalysisGrid from './components/VarianceAnalysis/VarianceAnalysisGrid';
import VarianceAnalysisChart from './components/VarianceAnalysis/VarianceAnalysisChart';
import CreateReport from './components/CreateReport/CreateReport';

const createStoreWithMiddleware = applyMiddleware(promiseMiddleware)(createStore);

class Index extends Component {
    render() {
        return (
            <div>
                {this.props.children}
            </div>

        );
    }

    componentDidMount() {}
}

ReactDOM.render(
    <Provider store={createStoreWithMiddleware(reducers)}>
        <Router history={hashHistory}>
            <Route component={Index}>
                <Route path="/login" component={Login}/>
                <Route path="/dashboard" name="Dashboard" component={Dashboard} >
                    <IndexRoute component={DashboardIndex} />
                    <Route path="capture-report-template" name="Capture Report Template" component={CaptureReportTemplate} />
                    <Route path="maintain-business-rules" name="Maintain Business Rules" component={MaintainBusinessRules} />
                    <Route path="data-grid" name="Data Grid" component={RegOpzDataGrid} />
                    <Route path="view-data-on-grid" name="View Data Grid" component={ViewDataComponent} />
                    <Route path="view-data" name="View Data">
                      <IndexRoute component={ViewDataComponentV2} />
                      <Route path="view-data-on-grid" name="View Data Grid" component={ViewDataComponent} />
                    </Route>
                    <Route path="view-report" name="View Report">
                      <IndexRoute component={ViewReport} />
                      <Route path="data-grid" component={RegOpzDataGrid} />
                    </Route>
                    <Route path="create-report" name="Create Report" component={CreateReport} />
                    <Route path="drill-down" name="DrillDown" component={DrillDown} />
                    <Route path="maintain-report-rules" name="Maintain Report Rules" component={MaintainReportRules} />
                    <Route path="maintain-report-rules/add-report-rules" name="Add Report Rules" component={AddReportRules} />
                    <Route path="maintain-sources" name="Maintain Sources" component={MaintainSources} />
                    <Route path="maintain-sources/add-sources" name="Add Sources" component={AddSources} />
                    <Route path="variance-analysis" name="Variance Analysis" component={VarianceAnalysisForm} />
                    <Route path="variance-analysis/variance-data-grid" name="Variance Analysis Grid" component={VarianceAnalysisGrid} />
                    <Route path="variance-analysis/variance-chart" name="Variance Analysis Chart" component={VarianceAnalysisChart}/>
                </Route>
            </Route>
        </Router>
    </Provider>
, document.querySelector(".react_container"));
