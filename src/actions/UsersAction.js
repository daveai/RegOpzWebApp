import axios from 'axios';
import { BASE_URL } from '../Constant/constant';
import promiseMiddleware from 'redux-promise';

export let ADD_USER_ACTION    = 'ADD_USER_ACTION';
export let CHECK_USER_ACTION  = 'CHECK_USER_ACTION';
export let FETCH_USER_ACTION  = 'FETCH_USER_ACTION';
export let UPDATE_USER_ACTION = 'UPDATE_USER_ACTION';
export let DELETE_USER_ACTION = 'DELETE_USER_ACTION';

// TODO: Send user detail to API
export function actionAddUser(data) {
    var url = BASE_URL + "users";
    console.log("Data recieved at Add User", data);
    const request = axios.post(url, data);
    console.log("Add users request response: ", request);
    return {
      type: ADD_USER_ACTION,
      payload: request
    };
}

// TODO: Fetch User Details from API
export function actionFetchUsers(user = null) {
  var url = BASE_URL + "users";
  let actionType = FETCH_USER_ACTION;
  if (user) {
    url += `/${user}`;
    actionType = CHECK_USER_ACTION;
  }
  console.log("Fetching users from API.");
  const request = axios.get(url);
  console.log("Fetch users request response: ", request);
  return {
    type: actionType,
    payload: request
  };
}
