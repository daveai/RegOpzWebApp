import { FETCH_USER_ACTION, UPDATE_USER_ACTION, DELETE_USER_ACTION } from '../actions/UsersAction.js';

// TODO: Create redux state to store User Details
export default function(state = [], action) {
  console.log("Action received at UserReducer:", action);
  switch (action.type) {
    case FETCH_USER_ACTION:
      return action.payload.data;
  }
}
