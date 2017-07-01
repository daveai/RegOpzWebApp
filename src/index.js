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
import { Provider, connect } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import promiseMiddleware from 'redux-promise';
import reducers from './reducers';
import Login, { isLoggedIn } from './components/Login';
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

const createStoreWithMiddleware = applyMiddleware(promiseMiddleware)(createStore);

class Index extends Component {
    render() {
      if (this.props.token !== null)
        window.location.replace('/#/login');
      else
        return (<div> {this.props.children} </div>);
    }
    componentDidMount() {
    }
}

ReactDOM.render(
    <Provider store={createStoreWithMiddleware(reducers)}>
        <Router history={hashHistory}>
            <Route path="/" component={VisibleIndex}>
                <Route path="login" component={Login}/>
                /*<Route path="/login" render={() => isLoggedIn() ?
                    (<Redirect to="/dashboard"/>) :
                    (<Login/>)}/>*/
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
                </Route>
            </Route>
        </Router>
    </Provider>
, document.querySelector(".react_container"));

function mapStateToProps(state) {
  token: state.login_store.token
}

const VisibleIndex = connect(
  null,
  mapStateToProps
)(Index);
