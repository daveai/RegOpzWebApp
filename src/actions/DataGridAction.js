import axios from 'axios';
export let FETCH_REPORT = 'FETCH_REPORT';
const BASE_URL = "http://ec2-54-169-118-137.ap-southeast-1.compute.amazonaws.com:3000/api/v1.0.0/";
export function actionFetchReportData(report_id){
  const url = BASE_URL + "document/" + report_id;
  const request = $.get(url);
  console.log(request);
  return{
    type:FETCH_REPORT,
    payload:request
  }
}
