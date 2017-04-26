import axios from 'axios';
export let FETCH_REPORT = 'FETCH_REPORT';
import BASE_URL from '../Constant/constant';
export function actionFetchReportData(report_id){
  const url = BASE_URL + "document/" + report_id;
  const request = $.get(url);
  console.log(request);
  return{
    type:FETCH_REPORT,
    payload:request
  }
}
