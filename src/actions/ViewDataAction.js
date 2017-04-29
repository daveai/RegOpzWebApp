import axios from 'axios';
import {BASE_URL} from '../Constant/constant';
import promiseMiddleware from 'redux-promise';
export let FETCH_DATES = "FETCH_DATES";
export let FETCH_REPORT_BY_DATE = "FETCH_REPORT_BY_DATE";
export let FETCH_SOURCE = "FETCH_SOURCE";
export function actionFetchDates(){
  return{
    type: FETCH_DATES,
    payload:axios.get(BASE_URL + "view-data/get-date-heads")
  }
}
export function actionFetchReportFromDate(source_id,business_date,page){
  return{
    type: FETCH_REPORT_BY_DATE,
    payload:axios.get(BASE_URL + `view-data/get-report?source_id=${source_id}&business_date=${business_date}&page=${page}`)
  }
}
export function actionFetchSource(business_date){
  return{
    type: FETCH_SOURCE,
    payload:axios.get(BASE_URL + "view-data/get-sources?business_date=" + business_date)
  }
}
