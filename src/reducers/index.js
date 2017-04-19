import { combineReducers } from 'redux';
import businessRulesReducer from './BusinessRulesReducer';
import ReportLinkageReducer from './ReportLinkageReducer';
const rootReducer = combineReducers({
  business_rules:businessRulesReducer,
  report_linkage:ReportLinkageReducer
});

export default rootReducer;
