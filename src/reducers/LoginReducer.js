import { LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_CHECK } from '../actions/LoginAction';

// TODO: Create Redux state for user containing token
export default function(state={}, action) {
  console.log("Action received at Login: ", action);
  switch (action.type) {
    case LOGIN_REQUEST:
      if (action.payload.data.status == LOGIN_SUCCESS)
        return {...state, token: action.payload.data.token}; //, name: action.meta.name, permission: action.meta.permission};
      return state;
    case LOGIN_CHECK:
      return Object.keys(state).length == 0 ? false : true;
    default:
      return state;
  }
}
