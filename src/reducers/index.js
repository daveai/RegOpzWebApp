import { combineReducers } from 'redux';
import businessRulesReducer from './BusinessRulesReducer';
import ReportLinkageReducer from './ReportLinkageReducer';
import ViewDataReducer from './ViewDataReducer';
const rootReducer = combineReducers({
  business_rules:businessRulesReducer,
  report_linkage:ReportLinkageReducer,
  data_date_heads:ViewDataReducer
});

export default rootReducer;
