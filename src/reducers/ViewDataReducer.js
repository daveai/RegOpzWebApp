import {
  FETCH_DATES,
  VIEW_DATA_FETCH_REPORT_LINKAGE
} from '../actions/ViewDataAction';

// TODO:
export default function(state=[], action) {
  console.log("Action received in view data reducer: ", action);
  switch(action.type) {
    case FETCH_DATES:
      return Object.assign({}, state, {
        dates:action.payload.data
      })
    case VIEW_DATA_FETCH_REPORT_LINKAGE:
      return Object.assign({}, state, {
        report_linkage:action.payload.data
      })
    default:
    	return state;
  }
}
