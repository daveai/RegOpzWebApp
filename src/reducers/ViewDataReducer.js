import {FETCH_DATES, VIEW_DATA_FETCH_REPORT_LINKAGE} from '../actions/ViewDataAction';
export default function(state=[],action){
  console.log("Action received in view data reducer: ",action);
  switch(action.type){
    case FETCH_DATES:
    	state.dates=[];
      return state.concat({dates:action.payload.data})
    case VIEW_DATA_FETCH_REPORT_LINKAGE:
      state.report_linkage = [];
      return state.concat({report_linkage:action.payload.data})
    default:
    	return state;
  }
}
