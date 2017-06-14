import { combineReducers } from 'redux';
import businessRulesReducer from './BusinessRulesReducer';
import ReportLinkageReducer from './ReportLinkageReducer';
import CapturedReportReducer from './CapturedReportReducer';
import ViewDataReducer from './ViewDataReducer';
import ReportReducer from './ReportReducer';
import SourceReducer from './SourceReducer';
import MaintainReportRulesReducer from './MaintainReportRulesReducer';
import VarianceAnalysisReducer from './VarianceAnalysisReducer';
const rootReducer = combineReducers({
  business_rules:businessRulesReducer,
  report_linkage:ReportLinkageReducer,
  view_data_store:ViewDataReducer,
  report_store:ReportReducer,
  sources:SourceReducer,
  captured_report:CapturedReportReducer,
  maintain_report_rules_store:MaintainReportRulesReducer,
  variance_analysis_store:VarianceAnalysisReducer
});

export default rootReducer;
