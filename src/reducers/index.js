import { combineReducers } from 'redux';
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

const rootReducer = combineReducers({
  business_rules:businessRulesReducer,
  report_linkage:ReportLinkageReducer,
  view_data_store:ViewDataReducer,
  report_store:ReportReducer,
  sources:SourceReducer,
  captured_report:CapturedReportReducer,
  maintain_report_rules_store:MaintainReportRulesReducer,
  source_feeds:MaintainSourcesReducer,
  variance_analysis_store:VarianceAnalysisReducer,
  create_report_store:CreateReportReducer
});

export default rootReducer;
