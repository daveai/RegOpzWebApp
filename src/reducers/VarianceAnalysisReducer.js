import {FETCH_COUNTRY_LIST,
        FETCH_REPORT_LIST,
        FETCH_DATE_LIST_FIRST,
        FETCH_DATE_LIST_SUBSEQUENT,
        SET_DATA_EXPORTED,
        FETCH_VARIANCE_REPORT,
        SET_VARIANCE_CHART_DATA
      } from '../actions/VarianceAnalysisAction';

export default function(state={},action){
  switch(action.type){
    case FETCH_COUNTRY_LIST:
      return Object.assign({},state,{country_list:action.payload.data});
    case FETCH_REPORT_LIST:
      return Object.assign({},state,{report_list:action.payload.data});
    case FETCH_DATE_LIST_FIRST:
      return Object.assign({},state,{date_list_first:action.payload.data});
    case FETCH_DATE_LIST_SUBSEQUENT:
      return Object.assign({},state,{date_list_subsequent:action.payload.data});
    case SET_DATA_EXPORTED:
      return Object.assign({},state,{data_exported:action.payload})
    case FETCH_VARIANCE_REPORT:
      return Object.assign({},state,{variance_report:action.payload.data});
    case SET_VARIANCE_CHART_DATA:
      return Object.assign({},state,{variance_chart_data:action.payload});
    default:
      return state;

  };
}
