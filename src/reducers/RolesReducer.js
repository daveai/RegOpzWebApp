import {
    FETCH_ROLE_ACTION,
    FETCH_ONE_ROLE_ACTION,
    FETCH_COMPONENT_ACTION,
    FETCH_PERMISSION_ACTION,
    UPDATE_ROLE_ACTION,
    DELETE_ROLE_ACTION
} from '../actions/RolesAction.js';

// TODO: Create redux state to store User Details
export default function(state = {}, action) {
  console.log("Action received at RolesReducer:", action);
  switch (action.type) {
    case FETCH_ROLE_ACTION:
      return { ...state, data: action.payload.data };
    case FETCH_ONE_ROLE_ACTION:
      return { ...state, form: action.payload.data };
    case FETCH_COMPONENT_ACTION:
      return { ...state, components: action.payload.data };
    case FETCH_PERMISSION_ACTION:
      return { ...state, permissions: action.payload.data };
    case UPDATE_ROLE_ACTION:
      return { ...state, message: action.payload.data };
    default:
      return state;
  }
}
