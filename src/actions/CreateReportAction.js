import axios from 'axios';
import {BASE_URL} from '../Constant/constant';

export const FETCH_REPORT_LIST='FETCH_REPORT_LIST';
export const FETCH_COUNTRY_LIST='FETCH_COUNTRY_LIST';
export const CREATE_REPORT='CREATE_REPORT';

export function actionFetchReportList(){

  const url=BASE_URL+"create-report/get-report-list";
  const request=axios.get(url);

  return{
    type:FETCH_REPORT_LIST,
    payload:request
  };

}

export function actionFetchCountryList(){
  const url=BASE_URL+"create-report/get-country-list";
  const request=axios.get(url);

  return {
    type:FETCH_COUNTRY_LIST,
    payload:request
  };
}

export function actionCreateReport(reportInfo){

  const url=BASE_URL+"create-report/generate-report";
  const request=axios.post(url,reportInfo);

  return {
    type:CREATE_REPORT,
    payload:request
  };

}
