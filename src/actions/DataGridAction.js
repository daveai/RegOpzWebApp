import axios from 'axios';
export let FETCH_REPORT = 'FETCH_REPORT';
const BASE_URL = "http://127.0.0.1:3000/api/v1.0.0/";
export function actionFetchReportData(report_id){
  const url = BASE_URL + "document/" + report_id;
  const request = $.get(url);
  console.log(request);
  return{
    type:FETCH_REPORT,
    payload:request
  }
}
