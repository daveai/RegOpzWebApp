import {FETCH_DATES} from '../actions/ViewDataAction';
export default function(state=[],action){
  console.log("Action received in view data reducer: ",action);
  switch(action.type){
    case FETCH_DATES:
    	state=[];
        return state.concat(action.payload.data)
    default:
    	return state;
  }
}
