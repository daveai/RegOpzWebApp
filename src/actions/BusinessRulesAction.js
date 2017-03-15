import axios from 'axios';
export let FETCH_RULES = 'FETCH_RULES';
const BASE_URL = "http://127.0.0.1:3000/api/v1.0.0/";
export function actionFetchBusinessRules(){
  const url = BASE_URL + "business-rules";
  const request = axios.get(url);
  console.log(request);
  return{
    type:FETCH_RULES,
    payload:request
  }
}
