import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import businessRulesReducer from './BusinessRulesReducer';
import ReportLinkageReducer from './ReportLinkageReducer';
import CapturedReportReducer from './CapturedReportReducer';
import ViewDataReducer from './ViewDataReducer';
import ReportReducer from './ReportReducer';
import SourceReducer from './SourceReducer';
import MaintainReportRulesReducer from './MaintainReportRulesReducer';
import MaintainSourcesReducer from './MaintainSourcesReducer';
import VarianceAnalysisReducer from './VarianceAnalysisReducer';
import CreateReportReducer from './CreateReportReducer';
import UsersReducer from './UsersReducer';
import LoginReducer from './LoginReducer';
import DefChangeReducer from './DefChangeReducer';
import RolesReducer from './RolesReducer';
import RuleAssistReducer from './RuleAssistReducer';

const rootReducer = combineReducers({
  user_details: UsersReducer,
  business_rules: businessRulesReducer,
  report_linkage: ReportLinkageReducer,
  view_data_store: ViewDataReducer,
  report_store: ReportReducer,
  sources: SourceReducer,
  captured_report: CapturedReportReducer,
  maintain_report_rules_store: MaintainReportRulesReducer,
  source_feeds: MaintainSourcesReducer,
  variance_analysis_store: VarianceAnalysisReducer,
  create_report_store: CreateReportReducer,
  login_store: LoginReducer,
  def_change_store: DefChangeReducer,
  role_management: RolesReducer,
  form: formReducer,
  rule_assist: RuleAssistReducer
});

export default rootReducer;
