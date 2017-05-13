import axios from 'axios';
export let FETCH_CAPTURED_REPORT = 'FETCH_CAPTURED_REPORT';
import {BASE_URL} from '../Constant/constant';
export function actionFetchReportData(report_id,reporting_date){
  const url = BASE_URL + "document/" + report_id + "?reporting_date="+reporting_date;
  const request = axios.get(url);
  console.log(request);
  return{
    type:FETCH_CAPTURED_REPORT,
    payload:request
  }
}
