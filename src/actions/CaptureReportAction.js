import axios from 'axios';
export let FETCH_CAPTURED_REPORT = 'FETCH_CAPTURED_REPORT';
export let DRILL_DOWN = 'DRILL_DOWN';
import {BASE_URL} from '../Constant/constant';
export function actionFetchReportData(report_id,reporting_date){
  const url = BASE_URL + "document/" + report_id + "?reporting_date="+reporting_date;
  const request = axios.get(url);
  console.log(request);
  return {
    type:FETCH_CAPTURED_REPORT,
    payload:request
  }
}
export function actionDrillDown(report_id, sheet_id, cell_id){
  let uri = `${BASE_URL}document/drill-down?report_id=${report_id}&sheet_id=${sheet_id}&cell_id=${cell_id}`;
  let urlEncodedURI = encodeURI(uri);
  const request = axios.get(urlEncodedURI);
  console.log(request)
  return {
    type:DRILL_DOWN,
    payload:request
  }
}
