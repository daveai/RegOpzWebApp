import axios from 'axios';
import { BASE_URL } from '../Constant/constant';
import promiseMiddleware from 'redux-promise';

export let ADD_USER_ACTION    = 'ADD_USER_ACTION';
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
export function actionFetchUsers() {
  var url = BASE_URL + "users";
  console.log("Fetching users from API.");
  const request = axios.get(url);
  console.log("Fetch users request response: ", request);
  return {
    type: FETCH_USER_ACTION,
    payload: request
  };
}
