import {FETCH_REPORT_BY_DATE} from '../actions/ViewDataAction';
export default function(state=[],action){
  console.log("Action received in report reducer: ",action);
  switch(action.type){
    case FETCH_REPORT_BY_DATE:
    	state=[];
      return state.concat(action.payload.data);
    default:
    	return state;
  }
}
