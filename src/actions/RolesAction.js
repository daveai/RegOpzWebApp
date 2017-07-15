import axios from 'axios';
import { BASE_URL } from '../Constant/constant';
import promiseMiddleware from 'redux-promise';

export let FETCH_ROLE_ACTION = 'FETCH_ROLE_ACTION';
export let UPDATE_ROLE_ACTION = 'UPDATE_ROLE_ACTION';
export let DELETE_ROLE_ACTION = 'DELETE_ROLE_ACTION';

// TODO: Fetch Role Details from API
export function actionFetchRoles() {
  var url = BASE_URL + "role";
  console.log("Fetching roles from API.");
  const request = axios.get(url);
  console.log("Fetch roles request response: ", request);
  return {
    type: FETCH_ROLE_ACTION,
    payload: request
  };
}
