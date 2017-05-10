import {FETCH_SOURCE} from '../actions/ViewDataAction';
export default function(state=[],action){
  console.log("Action received in source reducer: ",action);
  switch(action.type){
    case FETCH_SOURCE:
    	state=[];
      return state.concat(action.payload.data)
    default:
    	return state;
  }
}
