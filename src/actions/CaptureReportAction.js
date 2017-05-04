import axios from 'axios';
export let FETCH_CAPTURED_REPORT = 'FETCH_CAPTURED_REPORT';
import {BASE_URL} from '../Constant/constant';
export function actionFetchReportData(report_id){
  const url = BASE_URL + "document/" + report_id;
  const request = axios.get(url);
  console.log(request);
  return{
    type:FETCH_CAPTURED_REPORT,
    payload:request
  }
}
