import axios from 'axios';
import { BASE_URL } from '../Constant/constant';
import promiseMiddleware from 'redux-promise';

export let LOGIN_REQUEST = 'LOGIN_REQUEST';
export let LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export let LOGIN_FAILURE = 'LOGIN_FAILURE';
export let LOGIN_CHECK   = 'LOGIN_CHECK';

// TODO: Send Username and Password for login
export function actionLoginRequest(data) {
  var url = BASE_URL + "users";
  console.log("Data recieved for login: ", data);
  const request = axios.post(url, data);
  console.log("Login request response: ", request);
  return {
    type: LOGIN_REQUEST,
    payload: request
  }
}

// TODO: Checks if an user is logged in
export function actionIsLoggedIn() {
  console.log("Action recieved for Login Check");
  return {
    type: LOGIN_CHECK
  }
}
