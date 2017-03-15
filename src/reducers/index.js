import { combineReducers } from 'redux';
import reportReducer from './ReportReducer';
import businessRulesReducer from './BusinessRulesReducer';
const rootReducer = combineReducers({
  report:reportReducer,
  business_rules:businessRulesReducer
});

export default rootReducer;
