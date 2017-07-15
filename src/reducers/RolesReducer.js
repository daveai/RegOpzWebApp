import { FETCH_ROLE_ACTION, UPDATE_ROLE_ACTION, DELETE_ROLE_ACTION } from '../actions/RolesAction.js';

// TODO: Create redux state to store User Details
export default function(state = {}, action) {
  console.log("Action received at RolesReducer:", action);
  switch (action.type) {
    case FETCH_ROLE_ACTION:
      let newState = { data: action.payload.data }
      return newState;
    default:
      return state;
  }
}
