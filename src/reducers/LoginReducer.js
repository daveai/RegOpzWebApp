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
        setAuthorization(token);
        return { ...state, token: webToken }; //, name: action.meta.name, permission: action.meta.permission};
      }
      return state;
    case LOGIN_CHECK:
      return { ...state, token: payload };
    case LOGOUT:
      localStorage.removeItem('RegOpzToken');
      setAuthorization(false);
      return { ...state, token: null };
    default:
      return state;
  }
}
