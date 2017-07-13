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
import Dashboard from './Dashboard/Dashboard';
import CaptureReportTemplate from './CaptureReportTemplate/CaptureReportTemplate';
import DashboardIndex from './Dashboard/DashBoardIndex';
import MaintainBusinessRules from './MaintainBusinessRules/MaintainBusinessRules';
import AddBusinessRule from './MaintainBusinessRules/AddBusinessRule/AddBusinessRule';
import custom from '../../js/custom';
import RegOpzDataGrid from './RegOpzDataGrid/RegOpzDataGrid';
import ViewDataComponentV2 from './ViewData/ViewDataComponentV2';
import ViewDataComponent from './ViewData/ViewDataComponent';
import ViewReport from './ViewReport/ViewReport';
import DrillDown from './DrillDown/DrillDown';
import MaintainReportRules from './MaintainReportRules/MaintainReportRules';
import AddReportRules from './MaintainReportRules/AddReportRules/AddReportRules';
import AddReportAggRules from './MaintainReportRules/AddReportAggRules';
import MaintainSources from './MaintainSources/MaintainSources';
import AddSources from './MaintainSources/AddSources/AddSources';
import VarianceAnalysisForm from './VarianceAnalysis/VarianceAnalysis';
import VarianceAnalysisGrid from './VarianceAnalysis/VarianceAnalysisGrid';
import VarianceAnalysisChart from './VarianceAnalysis/VarianceAnalysisChart';
import CreateReport from './CreateReport/CreateReport';
import ManageDefChange from './ManageDefChange/ManageDefChange';

class HomeIndex extends Component {
    render() {
        return (
            <Router history={hashHistory}>
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
                    <Route path="variance-analysis/variance-chart" component={VarianceAnalysisChart}/>
                    <Route path="workflow/manage-def-change" component={ManageDefChange} />
                </Route>
            </Router>
        );
    }
}

export default HomeIndex;
