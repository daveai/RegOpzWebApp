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
<<<<<<< c5fa96d60258cbb2db479b28325e2e1f71fc902a
            <Route path="/" component={VisibleIndex}/>
=======
            <Route component={Index}>
                <Route path="/login" component={Login}/>
                <Route path="/dashboard" component={Dashboard} >
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
            </Route>
>>>>>>> Added dynamic record display for a particular item
        </Router>
    </Provider>
, document.querySelector(".react_container"));
