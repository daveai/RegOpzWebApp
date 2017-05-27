import axios from 'axios';
import {BASE_URL} from '../Constant/constant';
import promiseMiddleware from 'redux-promise';
export const FETCH_REPORT_TEMPLATE_LIST = 'FETCH_REPORT_TEMPLATE_LIST';
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
