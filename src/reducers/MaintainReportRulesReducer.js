import {
  FETCH_REPORT_TEMPLATE_LIST
} from '../actions/MaintainReportRuleAction';
export default function(state=[],action){
  console.log("Action received in maintain report rules reducer: ",action);
  switch(action.type){
    case FETCH_REPORT_TEMPLATE_LIST:
      state = [];
      return state.concat(action.payload.data)
    default:
    	return state;
  }
}
