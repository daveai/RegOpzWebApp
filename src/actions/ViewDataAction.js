import axios from 'axios';
import {BASE_URL} from '../Constant/constant';
import promiseMiddleware from 'redux-promise';
export let FETCH_DATES = "FETCH_DATES";
export function actionFetchDates(){
  return{
    type: FETCH_DATES,
    payload:axios.get(BASE_URL + "view-data")
  }
}
