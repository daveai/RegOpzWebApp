import axios from 'axios';
import {BASE_URL} from '../Constant/constant';
import promiseMiddleware from 'redux-promise';
export const FETCH_REPORT_TEMPLATE_LIST = 'FETCH_REPORT_TEMPLATE_LIST';
export const FETCH_BUSINESS_RULES_BY_SOURCE_ID = 'FETCH_BUSINESS_RULES_BY_SOURCE_ID';
export const FETCH_SOURCES = 'FETCH_SOURCES';
export function actionFetchReportTemplate(reports, country){
  let url = BASE_URL + "document/get-report-template-suggestion-list?";
  console.log("[" + reports + "]")
  if(typeof(reports) != 'undefined' && reports != ''){
    url += `reports=${reports}`;
  }
  if(typeof(country) != 'undefined'){
    url += `country=${country}`;
  }
  console.log(url);
  const request = axios.get(url);
  return{
    type:FETCH_REPORT_TEMPLATE_LIST,
    payload:request
  }
}

export function actionFetchBusinessRulesBySourceId(sourceId){
  let url = BASE_URL + `report-rule/get-business-rules-suggestion-list?source_id=${sourceId}`;
  const request = axios.get(url);
  return {
    type:FETCH_BUSINESS_RULES_BY_SOURCE_ID,
    payload:request
  }
}
export function actionFetchSources(){
  let url = BASE_URL + `report-rule/get-source-suggestion-list`;
  const request = axios.get(url);
  return {
    type:FETCH_SOURCES,
    payload:request
  }
}
