import {FETCH_REPORT_LINKAGE} from '../actions/BusinessRulesAction';
export default function(state=[],action){
  console.log("Action received in report linkage: ",action);
  switch(action.type){
    case FETCH_REPORT_LINKAGE: 
    	state=[];     
        return state.concat(action.payload.data)
    default:
    	return state;
  }
}
