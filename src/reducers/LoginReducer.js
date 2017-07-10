import { LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_CHECK, LOGOUT } from '../actions/LoginAction';
import setAuthorization from '../utils/setAuthorization';
import { key } from '../Constant/secret';
import jwt from 'json-web-token';

// TODO: Create Redux state for user containing token
export default function(state = {}, action) {
  console.log("Action received at Login: ", action);
  switch (action.type) {
    case LOGIN_REQUEST:
      localStorage.setItem('RegOpzToken', action.payload.data);
      setAuthorization(action.payload.data);
      // Need to decrypt the key here
      return { ...state, token: action.payload.data, error: null };
    case LOGIN_CHECK:
      setAuthorization(action.payload);
      return { ...state, token: action.payload, error: null };
    case LOGOUT:
      localStorage.removeItem('RegOpzToken');
      setAuthorization(false);
      return {};
    default:
      return state;
  }
}
