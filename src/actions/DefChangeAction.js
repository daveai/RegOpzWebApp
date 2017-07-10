import axios from 'axios';
import { BASE_URL } from '../Constant/constant';

export const FETCH_AUDIT_LIST='FETCH_AUDIT_LIST';
export const FETCH_RECORD_DETAIL='FETCH_RECORD_DETAIL';

export function actionFetchAuditList(){
  const url=BASE_URL+"workflow/def-change/get-audit-list";
  const request=axios.get(url);

  return {
    type:FETCH_AUDIT_LIST,
    payload:request
  };
}

export function actionFetchRecordDetail(table_name,id){
  const url=BASE_URL+`workflow/def-change/get-record-detail?table_name=${table_name}&id=${id}`
  const request=axios.get(url);

  return {
    type:FETCH_RECORD_DETAIL,
    payload:request
  };
}
