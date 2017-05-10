import {
  FETCH_REPORT_BY_DATE,
  INSERT_SOURCE_DATA,
  UPDATE_SOURCE_DATA,
  DELETE_SOURCE_ROW
} from '../actions/ViewDataAction';
export default function(state=[],action){
  console.log("Action received in report reducer: ",action);
  switch(action.type){
    case FETCH_REPORT_BY_DATE:
    	state=[];
      return state.concat(action.payload.data);
    case INSERT_SOURCE_DATA:
      state[0].rows.splice(action.meta.at,0,action.payload.data);
      return state.splice(0,1,state)
    case DELETE_SOURCE_ROW:
      state[0].rows.splice(action.meta.at,1);
      return state.splice(0,1,state)
    default:
    	return state;
  }
}
