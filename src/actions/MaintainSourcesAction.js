import axios from 'axios';
import { BASE_URL } from '../Constant/constant';
import promiseMiddleware from 'redux-promise';

export const FETCH_SOURCE_FEED_LIST = 'FETCH_SOURCE_FEED_LIST';
export const FETCH_SOURECE_FEED_COLUMNS_LIST = 'FETCH_SOURECE_FEED_COLUMNS_LIST';
export const INSERT_MAINTAIN_SOURCE_DATA = 'INSERT_MAINTAIN_SOURCE_DATA';
export const UPDATE_MAINTAIN_SOURCE_DATA = 'UPDATE_MAINTAIN_SOURCE_DATA';

// TODO:
export function actionFetchSources(sources, country) {
  let url = BASE_URL + "maintain-sources/get-source-feed-suggestion-list?";
  console.log("in action [" + sources + "],["+country+"]");
  if (typeof(sources) !== 'undefined' && sources.length !== 0) {
    url += `source_table_name=${sources}&`;
  }
  if (typeof(country) !== 'undefined') {
    url += `country=${country}&`;
  }
  console.log(url);
  const request = axios.get(url);
  return {
    type: FETCH_SOURCE_FEED_LIST,
    payload: request
  }
}

// TODO:
export function actionFetchSourceFeedColumnList(table_name) {
  let url = BASE_URL + `maintain-sources/get-sourcetable-column-suggestion-list?table_name=${table_name}`;
  const request = axios.get(url);
  return {
    type: FETCH_SOURECE_FEED_COLUMNS_LIST,
    payload: request
  }
}

// TODO:
export function actionInsertSourceData(data) {
  return {
    type: INSERT_MAINTAIN_SOURCE_DATA,
    payload: axios.post(BASE_URL + `maintain-sources`, data)
  }
}

// TODO:
export function actionUpdateSourceData(id, data) {
  return {
    type: UPDATE_MAINTAIN_SOURCE_DATA,
    payload: axios.put(BASE_URL + `maintain-sources/${id}`, data)
  }
}
