import axios from 'axios';
import { BASE_URL } from '../Constant/constant';
import promiseMiddleware from 'redux-promise';

export let FETCH_ROLE_ACTION = 'FETCH_ROLE_ACTION';
export let FETCH_ONE_ROLE_ACTION = 'FETCH_ONE_ROLE_ACTION';
export let FETCH_COMPONENT_ACTION = 'FETCH_COMPONENT_ACTION';
export let FETCH_PERMISSION_ACTION = 'FETCH_PERMISSION_ACTION';
export let UPDATE_ROLE_ACTION = 'UPDATE_ROLE_ACTION';
export let DELETE_ROLE_ACTION = 'DELETE_ROLE_ACTION';

// TODO: Fetch Role Details from API
export function actionFetchRoles() {
  var url = BASE_URL + "roles";
  console.log("Fetching roles from API.");
  const request = axios.get(url);
  console.log("Fetch roles request response:", request);
  return {
    type: FETCH_ROLE_ACTION,
    payload: request
  };
}

// TODO: Fetch single Role Details
export function actionFetchOneRole(role) {
    var url = BASE_URL + `roles?role=${role}`;
    console.log("Fetching roles from API for role", role);
    const request = axios.get(url);
    console.log("Fetch roles request response:", request);
    return {
      type: FETCH_ONE_ROLE_ACTION,
      payload: request
    };
}

// TODO: Get the list of Components available
export function actionFetchComponents() {
    var url = BASE_URL + "components";
    console.log("Fetching components from API.");
    const request = axios.get(url);
    console.log("Fetch components request response:", request);
    return {
        type: FETCH_COMPONENT_ACTION,
        payload: request
    };
}

// TODO: Get the list of Permissions available
export function actionFetchPermissions() {
    var url = BASE_URL + "permissions";
    console.log("Fetching permissions from API.");
    const request = axios.get(url);
    console.log("Fetch permissions request response:", request);
    return {
        type: FETCH_PERMISSION_ACTION,
        payload: request
    };
}
