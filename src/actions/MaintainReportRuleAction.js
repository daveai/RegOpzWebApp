import axios from 'axios';
import {BASE_URL} from '../Constant/constant';
import promiseMiddleware from 'redux-promise';
export const FETCH_REPORT_TEMPLATE_LIST = 'FETCH_REPORT_TEMPLATE_LIST';
export const FETCH_BUSINESS_RULES_BY_SOURCE_ID = 'FETCH_BUSINESS_RULES_BY_SOURCE_ID';
export const FETCH_SOURCES = 'FETCH_SOURCES';
export const FETCH_SINGLE_SOURCE = 'FETCH_SINGLE_SOURCE';
export const FETCH_TABLE_COLUMNS_LIST = 'FETCH_TABLE_COLUMNS_LIST';
export const INSERT_MAINTAIN_RULE_DATA = 'INSERT_MAINTAIN_RULE_DATA';
export const UPDATE_MAINTAIN_RULE_DATA = 'UPDATE_MAINTAIN_RULE_DATA';
export const DELETE_MAINTAIN_RULE_DATA = 'DELETE_MAINTAIN_RULE_DATA';
export function actionFetchReportTemplate(reports, country){
  let url = BASE_URL + "document/get-report-template-suggestion-list?";
  console.log("[" + reports + "]")
  if(typeof(reports) != 'undefined' && reports != ''){
    url += `reports=${reports}&`;
  }
  if(typeof(country) != 'undefined'){
    url += `country=${country}&`;
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
export function actionFetchSources(sourceId){
  let url = BASE_URL + `report-rule/get-source-suggestion-list`;
  if (sourceId) {
    console.log('in action',sourceId);
    url = url + `?source_id=${sourceId}`
  }
  const request = axios.get(url);
  return {
    type:FETCH_SOURCES,
    payload:request
  }
}

export function actionFetchSourceColumnList(table_name){
  let url = BASE_URL + `report-rule/get-agg-function-column-suggestion-list?table_name=${table_name}`;
  const request = axios.get(url);
  return {
    type:FETCH_TABLE_COLUMNS_LIST,
    payload:request
  }
}
export function actionInsertRuleData(data){
  return{
    type:INSERT_MAINTAIN_RULE_DATA,
    payload:axios.post(BASE_URL + `report-rule`, data)
  }
}
export function actionUpdateRuleData(id,data){
  return{
    type:UPDATE_MAINTAIN_RULE_DATA,
    payload:axios.put(BASE_URL + `report-rule/${id}`, data)
  }
}
export function actionDeleteRuleData(id,table_name,at){
  console.log('in action delete maintain rule')
  return{
    type:DELETE_MAINTAIN_RULE_DATA,
    payload:axios.delete(BASE_URL + `report-rule/${id}?table_name=${table_name}`),
    //payload:axios.delete(BASE_URL + `report-rule/99999999999?table_name=${table_name}`),
    meta:{
			at:at
		}
  }
}
