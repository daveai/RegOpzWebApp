import axios from 'axios';
import {BASE_URL} from '../Constant/constant';
import promiseMiddleware from 'redux-promise';
export let FETCH_RULES = 'FETCH_RULES';
export let INSERT_RULES = 'INSERT_RULES';
export let DELETE_RULES = 'DELETE_RULES';
export let UPDATE_RULES = 'UPDATE_RULES';
export function actionFetchBusinessRules(page){
  const url = BASE_URL + "business-rules/" + page;
  const request = axios.get(url);
  return{
    type:FETCH_RULES,
    payload:request
  }
}
export function actionInsertBusinessRule(item, at){	
	const url = BASE_URL + "business-rules";
	console.log("item inserting ", item);	
	const request = axios.post(url, item);
	console.log("post request response ", request)
	return {
		type:INSERT_RULES,
		payload:request,
		meta:{
			at:at
		}
	}
}
export function actionUpdateBusinessRule(item){	
	const url = BASE_URL + "business-rules";
	console.log("item updating", item);	
	const request = axios.put(url + "/" + item['id'], item);
	return {
		type:UPDATE_RULES,
		payload:{result:"updated"}
	}
}
export function actionDeleteBusinessRule(at){
	return {
		type:DELETE_RULES,
		payload:{at:at}
	}
}
