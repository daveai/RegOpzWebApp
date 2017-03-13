import { combineReducers } from 'redux';
import reportReducer from './ReportReducer';
const rootReducer = combineReducers({
  report:reportReducer
});

export default rootReducer;
