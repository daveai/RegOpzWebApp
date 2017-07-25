import axios from 'axios';
import { BASE_URL } from '../Constant/constant';
import promiseMiddleware from 'redux-promise';

export let FETCH_ROLE_ACTION = 'FETCH_ROLE_ACTION';
export let FETCH_ONE_ROLE_ACTION = 'FETCH_ONE_ROLE_ACTION';
export let FETCH_PERMISSION_ACTION = 'FETCH_PERMISSION_ACTION';
export let UPDATE_ROLE_ACTION = 'UPDATE_ROLE_ACTION';
export let DELETE_ROLE_ACTION = 'DELETE_ROLE_ACTION';

// Target URL
var url = BASE_URL + "roles";

// TODO: Fetch Role Details from API
export function actionFetchRoles(role) {
    actionType = FETCH_ROLE_ACTION;
    if (typeof role !== 'undefined') {
        url += `/${role}`;
        actionType = FETCH_ONE_ROLE_ACTION;
    }
    console.log("Fetching roles from API.");
    const request = axios.get(url);
    console.log("Fetch roles request response:", request);
    return {
        type: actionType,
        payload: request
    };
}

// TODO: Get the list of Permissions available
export function actionFetchPermissions() {
    var purl = BASE_URL + "permissions";
    console.log("Fetching permissions from API.");
    const request = axios.get(purl);
    console.log("Fetch permissions request response:", request);
    return {
        type: FETCH_PERMISSION_ACTION,
        payload: request
    };
}

// TODO: Send role data to API
export function actionUpdateRoles(data) {
    console.log("Sending roles to API.", data);
    const request = axios.post(url, data);
    console.log("Update roles request response:", request);
    return {
        type: UPDATE_ROLE_ACTION,
        payload: request
    };
}

// TODO: Delete role data
export function actionDeleteRoles(role) {
    if (typeof role !== 'undefined') {
        url += `/${role}`;
        console.log("Deleting roles to API.", role);
        const request = axios.delete(url);
        console.log("Delete roles request response:", request);
        return {
            type: DELETE_ROLE_ACTION,
            payload: request
        };
    }
}
