import axios from 'axios';
import {BASE_URL} from '../Constant/constant';
import promiseMiddleware from 'redux-promise';
export let FETCH_DATES = "FETCH_DATES";
export let FETCH_REPORT_BY_DATE = "FETCH_REPORT_BY_DATE";
export let FETCH_SOURCE = "FETCH_SOURCE";
export let VIEW_DATA_FETCH_REPORT_LINKAGE = "VIEW_DATA_FETCH_REPORT_LINKAGE";
export function actionFetchDates(startDate='19000101',endDate='39991231'){
  console.log("Base url",BASE_URL + `view-data/get-date-heads?start_date=${startDate}&end_date=${endDate}`);
  return{
    type: FETCH_DATES,
    payload:axios.get(BASE_URL + `view-data/get-date-heads?start_date=${startDate}&end_date=${endDate}`)
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
export function actionFetchReportLinkage(source_id,qualifying_key,business_date){
  return {
    type: VIEW_DATA_FETCH_REPORT_LINKAGE,
    payload: axios.get(`${BASE_URL}view-data/get-report-linkage?source_id=${source_id}&qualifying_key=${qualifying_key}&business_date=${business_date}`)
  }
}
