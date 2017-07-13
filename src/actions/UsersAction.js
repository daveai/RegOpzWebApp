import axios from 'axios';
import { BASE_URL } from '../Constant/constant';
import promiseMiddleware from 'redux-promise';

export let FETCH_USER_ACTION = 'FETCH_USER_ACTION';
export let UPDATE_USER_ACTION = 'UPDATE_USER_ACTION';
export let DELETE_USER_ACTION = 'DELETE_USER_ACTION';

// TODO: Fetch User Details from API
export function actionFetchUsers() {
  var url = BASE_URL + "users";
  console.log("Fetching users from API.");
  const request = axios.get(url);
  console.log("Login request response: ", request);
  return {
    type: LOGIN_REQUEST,
    payload: request
  };
}
