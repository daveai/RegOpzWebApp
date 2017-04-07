import axios from 'axios';
export let FETCH_RULES = 'FETCH_RULES';
export let INSERT_RULES = 'INSERT_RULES';
export let DELETE_RULES = 'DELETE_RULES';
const BASE_URL = "http://ec2-54-169-118-137.ap-southeast-1.compute.amazonaws.com:3000/api/v1.0.0/";
export function actionFetchBusinessRules(){
  const url = BASE_URL + "business-rules";
  const request = axios.get(url);
  console.log(request);
  return{
    type:FETCH_RULES,
    payload:request
  }
}
export function actionInsertBusinessRule(item, at){
	console.log("The item passed is ", item);
	return {
		type:INSERT_RULES,
		payload:{item:item, at:at}
	}
}
export function actionDeleteBusinessRule(at){
	return {
		type:DELETE_RULES,
		payload:{at:at}
	}
}
