import { LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_CHECK, LOGOUT } from '../actions/LoginAction';
import setAuthorization from '../utils/setAuthorization';

// TODO: Create Redux state for user containing token
export default function(state={}, action) {
  console.log("Action received at Login: ", action);
  switch (action.type) {
    case LOGIN_REQUEST:
      if (action.payload.data.status == LOGIN_SUCCESS) {
        let webToken = action.payload.data.token;
        localStorage.setItem('RegOpzToken', webToken);
        setAuthorization(webToken);
        return { ...state, token: webToken, error: null }; //, name: action.meta.name, permission: action.meta.permission};
      }
      return { error: action.payload.data.error };
    case LOGIN_CHECK:
      return { ...state, token: action.payload, error: null };
    case LOGOUT:
      localStorage.removeItem('RegOpzToken');
      setAuthorization(false);
      return {};
    default:
      return state;
  }
}
