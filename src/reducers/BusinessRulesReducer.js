import {FETCH_RULES} from '../actions/BusinessRulesAction';
export default function(state=[],action){
  console.log("Action received: ",action);
  switch(action.type){
    case FETCH_RULES:
      return state.concat(action.payload.data)
    default:
      return state;

  }
}
