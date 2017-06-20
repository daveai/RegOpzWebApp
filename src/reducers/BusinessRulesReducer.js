import {FETCH_RULES, INSERT_RULES, DELETE_RULES} from '../actions/BusinessRulesAction';

// TODO:
export default function(state=[], action) {
  console.log("Action received: ",action);
  switch(action.type) {
    case FETCH_RULES:
        state = [];
      	return state.concat(action.payload.data);
    case INSERT_RULES:
    	state[0].rows.splice(action.meta.at, 0, action.payload.data);
    	return state.splice(0, 1, state);
    case DELETE_RULES:
    	state[0].rows.splice(action.meta.at, 1);
    	return state.splice(0, 1, state);
    default:
      return state;
  }
}
