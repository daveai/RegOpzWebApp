import axios from 'axios';
import {BASE_URL} from '../Constant/constant';
import promiseMiddleware from 'redux-promise';
export let FETCH_DATES = "FETCH_DATES";
export let FETCH_REPORT_BY_DATE = "FETCH_REPORT_BY_DATE";
export let FETCH_DRILLDOWN_REPORT = "FETCH_DRILLDOWN_REPORT";
export let FETCH_DRILLDOWN_RULES_REPORT = "FETCH_DRILLDOWN_RULES_REPORT";
export let FETCH_SOURCE = "FETCH_SOURCE";
export let VIEW_DATA_FETCH_REPORT_LINKAGE = "VIEW_DATA_FETCH_REPORT_LINKAGE";
export let INSERT_SOURCE_DATA = "INSERT_SOURCE_DATA";
export let UPDATE_SOURCE_DATA = "UPDATE_SOURCE_DATA";
export let DELETE_SOURCE_ROW = "DELETE_SOURCE_ROW";
export let GENERATE_REPORT = "GENERATE_REPORT";
export let APPLY_RULES = "APPLY_RULES";
export function actionFetchDates(startDate='19000101',endDate='39991231', table_name){
  console.log("Base url",BASE_URL + `view-data/get-date-heads?start_date=${startDate}&end_date=${endDate}&table_name=${table_name}`);
  return{
    type: FETCH_DATES,
    payload:axios.get(BASE_URL + `view-data/get-date-heads?start_date=${startDate}&end_date=${endDate}&table_name=${table_name}`)
  }
}
export function actionFetchReportFromDate(source_id,business_date,page){
  return{
    type: FETCH_REPORT_BY_DATE,
    payload:axios.get(BASE_URL + `view-data/report?source_id=${source_id}&business_date=${business_date}&page=${page}`)
  }
}
export function actionFetchDrillDownReport(drill_info){
  console.log('In the action drilldown',drill_info)
  return{
    type: FETCH_DRILLDOWN_REPORT,
    payload:axios.get(BASE_URL + `document/drill-down-data`,drill_info),
  }
}
export function actionFetchDrillDownRulesReport(rules,source_id,page){
  console.log('In the action drilldown fetch rules',rules,source_id,page)
  return{
    type: FETCH_DRILLDOWN_RULES_REPORT,
    payload:axios.get(BASE_URL + `business-rules/drill-down-rules?source_id=${source_id}&rules=${rules}&page=${page}`),
  }
}
export function actionDeleteFromSourceData(id,business_date,table_name,at){
  return{
    type: DELETE_SOURCE_ROW,
    payload:axios.delete(BASE_URL + `view-data/report/${id}?table_name=${table_name}&business_date=${business_date}`),
    meta:{
      at:at
    }
  }
}
export function actionInsertSourceData(data, at){
  return{
    type:INSERT_SOURCE_DATA,
    payload:axios.post(BASE_URL + `view-data/report`, data),
    meta:{
      at:at
    }
  }
}
export function actionUpdateSourceData(data){
  return{
    type:UPDATE_SOURCE_DATA,
    payload:axios.put(BASE_URL + `view-data/report/${data.update_info['id']}`, data),
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
export function actionGenerateReport(report_info){
  return {
    type: GENERATE_REPORT,
    payload:axios.post(BASE_URL+`view-data/generate-report`,report_info),
  }
}
export function actionApplyRules(source_info){
  return {
    type: APPLY_RULES,
    payload:axios.post(BASE_URL+`view-data/apply-rules`,source_info),
  }
}
